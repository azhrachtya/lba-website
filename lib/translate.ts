// Terjemahan Google hanya jalan kalau TRANSLATE_API_ENABLED=true dan key terisi.
const MAX_CHARS = 2000;      // batas panjang teks per panggilan
const MAX_CALLS_PER_MIN = 20; // batas panggilan Google per menit (global)

let windowStart = 0;
let calls = 0;

function allowCall() {
  const now = Date.now();
  if (now - windowStart > 60_000) {
    windowStart = now;
    calls = 0;
  }
  calls += 1;
  return calls <= MAX_CALLS_PER_MIN;
}

export async function translateText(text: string, targetLang: "id" | "zh"): Promise<string> {
  const key = process.env.GOOGLE_TRANSLATE_API_KEY;
  if (process.env.TRANSLATE_API_ENABLED !== "true") return text;
  if (!key || !text || text.length > MAX_CHARS) return text;
  if (!allowCall()) return text;

  try {
    const res = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${key}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ q: text, source: "en", target: targetLang, format: "text" }),
      signal: AbortSignal.timeout(5000),
    });
    const data = await res.json();
    if (data?.error) {
      console.error("GOOGLE TRANSLATE ERROR:", JSON.stringify(data.error));
      return text;
    }
    return data?.data?.translations?.[0]?.translatedText || text;
  } catch (e) {
    console.error("GOOGLE TRANSLATE EXCEPTION:", e);
    return text;
  }
}