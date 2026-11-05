const MAX_TEXTS = 20;
const MAX_TEXT_LENGTH = 2_000;
const MAX_TOTAL_TEXT_LENGTH = 10_000;
const SUPPORTED_LANGUAGES = new Set(["id", "zh"]);

function validationError(status, error) {
  return { ok: false, status, error };
}

function validateTranslationPayload(payload) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return validationError(400, "Request body must be a JSON object");
  }

  const { texts, lang } = payload;

  if (!SUPPORTED_LANGUAGES.has(lang)) {
    return validationError(400, "Unsupported target language");
  }

  if (!Array.isArray(texts)) {
    return validationError(400, "texts must be an array");
  }

  if (texts.length === 0) {
    return validationError(400, "texts must not be empty");
  }

  if (texts.length > MAX_TEXTS) {
    return validationError(413, `A maximum of ${MAX_TEXTS} texts is allowed`);
  }

  if (!texts.every((text) => typeof text === "string")) {
    return validationError(400, "texts must contain only strings");
  }

  if (texts.some((text) => text.length > MAX_TEXT_LENGTH)) {
    return validationError(413, `Each text must not exceed ${MAX_TEXT_LENGTH} characters`);
  }

  const totalLength = texts.reduce((sum, text) => sum + text.length, 0);
  if (totalLength > MAX_TOTAL_TEXT_LENGTH) {
    return validationError(413, `Total text must not exceed ${MAX_TOTAL_TEXT_LENGTH} characters`);
  }

  return { ok: true, texts, lang };
}

function createFixedWindowRateLimiter({ limit, windowMs, maxClients = 1_000 }) {
  const clients = new Map();

  return {
    check(clientKey, now = Date.now()) {
      const existing = clients.get(clientKey);
      if (!existing || now >= existing.resetAt) {
        if (!existing && clients.size >= maxClients) {
          const oldestClientKey = clients.keys().next().value;
          if (oldestClientKey !== undefined) clients.delete(oldestClientKey);
        }
        clients.set(clientKey, { count: 1, resetAt: now + windowMs });
        return { allowed: true, remaining: limit - 1 };
      }

      if (existing.count >= limit) {
        return {
          allowed: false,
          retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1_000)),
        };
      }

      existing.count += 1;
      return { allowed: true, remaining: limit - existing.count };
    },
  };
}

function createGlobalAndClientRateLimiter({ globalLimiter, clientLimiter }) {
  return {
    check(clientKey, now = Date.now()) {
      const globalResult = globalLimiter.check("global", now);
      if (!globalResult.allowed) return globalResult;
      return clientLimiter.check(clientKey, now);
    },
  };
}

function getClientKey(headers) {
  const direct = headers.get("cf-connecting-ip") || headers.get("x-real-ip");
  if (direct) return direct.trim();

  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",", 1)[0].trim();

  return "unknown";
}

async function readJsonBodyWithLimit(request, maxBytes) {
  if (!request.body) return { ok: false, error: "Request body must be valid JSON" };

  const reader = request.body.getReader();
  const chunks = [];
  let totalBytes = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    totalBytes += value.byteLength;
    if (totalBytes > maxBytes) {
      await reader.cancel();
      return { ok: false, tooLarge: true };
    }
    chunks.push(value);
  }

  const body = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }

  try {
    return { ok: true, value: JSON.parse(new TextDecoder().decode(body)) };
  } catch {
    return { ok: false, error: "Request body must be valid JSON" };
  }
}

async function processTranslationRequest(request, { limiter, translateBatch, now = Date.now }) {
  const noStoreHeaders = { "Cache-Control": "no-store" };
  const contentType = request.headers.get("content-type") || "";
  const mediaType = contentType.split(";", 1)[0].trim().toLowerCase();
  if (mediaType !== "application/json") {
    return {
      status: 415,
      body: { error: "Content-Type must be application/json" },
      headers: noStoreHeaders,
    };
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (Number.isFinite(contentLength) && contentLength > 65_536) {
    return {
      status: 413,
      body: { error: "Request body is too large" },
      headers: noStoreHeaders,
    };
  }

  const limitResult = limiter.check(getClientKey(request.headers), now());
  if (!limitResult.allowed) {
    return {
      status: 429,
      body: { error: "Too many translation requests" },
      headers: {
        ...noStoreHeaders,
        "Retry-After": String(limitResult.retryAfterSeconds),
      },
    };
  }

  const parsedBody = await readJsonBodyWithLimit(request, 65_536);
  if (!parsedBody.ok) {
    return {
      status: parsedBody.tooLarge ? 413 : 400,
      body: {
        error: parsedBody.tooLarge ? "Request body is too large" : parsedBody.error,
      },
      headers: noStoreHeaders,
    };
  }

  const validation = validateTranslationPayload(parsedBody.value);
  if (!validation.ok) {
    return {
      status: validation.status,
      body: { error: validation.error },
      headers: noStoreHeaders,
    };
  }

  const translations = await translateBatch(validation.texts, validation.lang);

  return {
    status: 200,
    body: { translations },
    headers: {
      ...noStoreHeaders,
      "X-RateLimit-Remaining": String(limitResult.remaining),
    },
  };
}

exports.createFixedWindowRateLimiter = createFixedWindowRateLimiter;
exports.createGlobalAndClientRateLimiter = createGlobalAndClientRateLimiter;
exports.getClientKey = getClientKey;
exports.processTranslationRequest = processTranslationRequest;
exports.validateTranslationPayload = validateTranslationPayload;
