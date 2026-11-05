export type TranslationValidationResult =
  | { ok: true; texts: string[]; lang: "id" | "zh" }
  | { ok: false; status: number; error: string };

export type RateLimitResult =
  | { allowed: true; remaining: number }
  | { allowed: false; retryAfterSeconds: number };

export interface RateLimiter {
  check(clientKey: string, now?: number): RateLimitResult;
}

export interface TranslationResponse {
  status: number;
  body: { translations?: string[]; error?: string };
  headers: Record<string, string>;
}

export function validateTranslationPayload(payload: unknown): TranslationValidationResult;
export function createFixedWindowRateLimiter(options: {
  limit: number;
  windowMs: number;
  maxClients?: number;
}): RateLimiter;
export function createGlobalAndClientRateLimiter(options: {
  globalLimiter: RateLimiter;
  clientLimiter: RateLimiter;
}): RateLimiter;
export function getClientKey(headers: Headers): string;
export function processTranslationRequest(
  request: Request,
  options: {
    limiter: RateLimiter;
    translateBatch: (texts: string[], lang: "id" | "zh") => Promise<string[]>;
    now?: () => number;
  },
): Promise<TranslationResponse>;
