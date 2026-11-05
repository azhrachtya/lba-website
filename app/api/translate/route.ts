import { NextResponse } from "next/server";
import { translateTexts } from "@/lib/translate";
import {
  createFixedWindowRateLimiter,
  createGlobalAndClientRateLimiter,
  processTranslationRequest,
} from "@/lib/translationRequest";

const translationRateLimiter = createGlobalAndClientRateLimiter({
  globalLimiter: createFixedWindowRateLimiter({ limit: 10, windowMs: 60_000, maxClients: 1 }),
  clientLimiter: createFixedWindowRateLimiter({ limit: 5, windowMs: 60_000 }),
});

export async function POST(req: Request) {
  const result = await processTranslationRequest(req, {
    limiter: translationRateLimiter,
    translateBatch: translateTexts,
  });

  return NextResponse.json(result.body, {
    status: result.status,
    headers: result.headers,
  });
}
