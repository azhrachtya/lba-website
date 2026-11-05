import assert from "node:assert/strict";
import test from "node:test";

import {
  createFixedWindowRateLimiter,
  createGlobalAndClientRateLimiter,
  getClientKey,
  processTranslationRequest,
  validateTranslationPayload,
} from "../lib/translationRequest.js";

test("accepts supported translation payloads", () => {
  assert.deepEqual(validateTranslationPayload({ texts: ["Hello", "World"], lang: "id" }), {
    ok: true,
    texts: ["Hello", "World"],
    lang: "id",
  });
});

test("rejects unsupported languages", () => {
  assert.deepEqual(validateTranslationPayload({ texts: ["Hello"], lang: "fr" }), {
    ok: false,
    status: 400,
    error: "Unsupported target language",
  });
});

test("rejects non-string text values", () => {
  assert.deepEqual(validateTranslationPayload({ texts: ["Hello", 7], lang: "zh" }), {
    ok: false,
    status: 400,
    error: "texts must contain only strings",
  });
});

test("rejects oversized batches", () => {
  assert.equal(
    validateTranslationPayload({ texts: Array.from({ length: 21 }, () => "x"), lang: "id" }).status,
    413,
  );
  assert.equal(validateTranslationPayload({ texts: ["x".repeat(2001)], lang: "id" }).status, 413);
  assert.equal(
    validateTranslationPayload({ texts: Array.from({ length: 6 }, () => "x".repeat(2000)), lang: "id" }).status,
    413,
  );
});

test("rate limiter blocks requests beyond the fixed-window limit", () => {
  const limiter = createFixedWindowRateLimiter({ limit: 2, windowMs: 1_000 });

  assert.deepEqual(limiter.check("client-a", 0), { allowed: true, remaining: 1 });
  assert.deepEqual(limiter.check("client-a", 100), { allowed: true, remaining: 0 });
  assert.deepEqual(limiter.check("client-a", 200), { allowed: false, retryAfterSeconds: 1 });
  assert.deepEqual(limiter.check("client-a", 1_000), { allowed: true, remaining: 1 });
});

test("rate limiter isolates clients", () => {
  const limiter = createFixedWindowRateLimiter({ limit: 1, windowMs: 1_000 });

  assert.equal(limiter.check("client-a", 0).allowed, true);
  assert.equal(limiter.check("client-b", 0).allowed, true);
});

test("rate limiter bounds client memory by evicting the oldest client", () => {
  const limiter = createFixedWindowRateLimiter({ limit: 1, windowMs: 10_000, maxClients: 2 });

  assert.equal(limiter.check("client-a", 0).allowed, true);
  assert.equal(limiter.check("client-b", 1).allowed, true);
  assert.equal(limiter.check("client-c", 2).allowed, true);
  assert.equal(limiter.check("client-a", 3).allowed, true);
});

test("combined limiter enforces a global cap even when client keys change", () => {
  const limiter = createGlobalAndClientRateLimiter({
    globalLimiter: createFixedWindowRateLimiter({ limit: 2, windowMs: 60_000 }),
    clientLimiter: createFixedWindowRateLimiter({ limit: 2, windowMs: 60_000 }),
  });

  assert.equal(limiter.check("spoofed-a", 0).allowed, true);
  assert.equal(limiter.check("spoofed-b", 1).allowed, true);
  assert.equal(limiter.check("spoofed-c", 2).allowed, false);
});

test("client key prefers trusted proxy headers and normalizes forwarded lists", () => {
  assert.equal(
    getClientKey(new Headers({ "cf-connecting-ip": "203.0.113.5", "x-forwarded-for": "198.51.100.3" })),
    "203.0.113.5",
  );
  assert.equal(
    getClientKey(new Headers({ "x-forwarded-for": "198.51.100.3, 10.0.0.1" })),
    "198.51.100.3",
  );
  assert.equal(getClientKey(new Headers()), "unknown");
});

test("translation request rejects non-JSON content", async () => {
  const result = await processTranslationRequest(
    new Request("https://example.test/api/translate", { method: "POST", body: "hello" }),
    {
      limiter: createFixedWindowRateLimiter({ limit: 5, windowMs: 60_000 }),
      translateBatch: async (texts) => texts,
    },
  );

  assert.equal(result.status, 415);
  assert.equal(result.body.error, "Content-Type must be application/json");
});

test("translation request rejects JSON-like but invalid media types", async () => {
  const request = new Request("https://example.test/api/translate", {
    method: "POST",
    headers: { "content-type": "application/jsonp" },
    body: JSON.stringify({ texts: ["Hello"], lang: "id" }),
  });
  const result = await processTranslationRequest(request, {
    limiter: createFixedWindowRateLimiter({ limit: 5, windowMs: 60_000 }),
    translateBatch: async (texts) => texts,
  });

  assert.equal(result.status, 415);
});

test("translation request rejects oversized chunked bodies", async () => {
  const request = new Request("https://example.test/api/translate", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ texts: ["Hello"], lang: "id", padding: "x".repeat(70_000) }),
  });

  const result = await processTranslationRequest(request, {
    limiter: createFixedWindowRateLimiter({ limit: 5, windowMs: 60_000 }),
    translateBatch: async (texts) => texts,
  });

  assert.deepEqual(result, {
    status: 413,
    body: { error: "Request body is too large" },
    headers: { "Cache-Control": "no-store" },
  });
});

test("translation request uses one batch translation call", async () => {
  const request = new Request("https://example.test/api/translate", {
    method: "POST",
    headers: { "content-type": "application/json", "x-real-ip": "203.0.113.9" },
    body: JSON.stringify({ texts: ["Hello", ""], lang: "id" }),
  });

  let calls = 0;
  const result = await processTranslationRequest(request, {
    limiter: createFixedWindowRateLimiter({ limit: 5, windowMs: 60_000 }),
    translateBatch: async (texts, lang) => {
      calls += 1;
      return texts.map((text) => (text ? `${lang}:${text}` : text));
    },
  });

  assert.deepEqual(result, {
    status: 200,
    body: { translations: ["id:Hello", ""] },
    headers: { "Cache-Control": "no-store", "X-RateLimit-Remaining": "4" },
  });
  assert.equal(calls, 1);
});

test("translation request returns 429 with Retry-After", async () => {
  const limiter = createFixedWindowRateLimiter({ limit: 1, windowMs: 60_000 });
  const makeRequest = () =>
    new Request("https://example.test/api/translate", {
      method: "POST",
      headers: { "content-type": "application/json", "x-real-ip": "203.0.113.10" },
      body: JSON.stringify({ texts: ["Hello"], lang: "zh" }),
    });
  const options = { limiter, now: () => 0, translateBatch: async (texts) => texts };

  assert.equal((await processTranslationRequest(makeRequest(), options)).status, 200);
  assert.deepEqual(await processTranslationRequest(makeRequest(), options), {
    status: 429,
    body: { error: "Too many translation requests" },
    headers: { "Cache-Control": "no-store", "Retry-After": "60" },
  });
});
