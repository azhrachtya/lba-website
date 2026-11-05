type TargetLang = "id" | "zh";

// Google Cloud Translation v2 accepts multiple q values in one request. Batching
// avoids one upstream request per text fragment and makes the rate limit meaningful.
export async function translateTexts(texts: string[], targetLang: TargetLang): Promise<string[]> {
  const key = process.env.GOOGLE_TRANSLATE_API_KEY;
  const enabled = process.env.TRANSLATE_API_ENABLED === "true";
  if (!enabled || !key || texts.every((text) => !text)) return texts;

  try {
    const res = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${key}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ q: texts, source: "en", target: targetLang, format: "text" }),
      signal: AbortSignal.timeout(10_000),
    });
    const data = await res.json();
    if (!res.ok || data?.error) {
      console.error("GOOGLE TRANSLATE ERROR:", res.status, JSON.stringify(data?.error));
      return texts;
    }

    const translated = data?.data?.translations;
    if (!Array.isArray(translated) || translated.length !== texts.length) return texts;
    return translated.map((item: { translatedText?: unknown }, index: number) =>
      typeof item?.translatedText === "string" ? item.translatedText : texts[index],
    );
  } catch (error) {
    console.error("GOOGLE TRANSLATE EXCEPTION:", error);
    return texts;
  }
}

export async function translateText(text: string, targetLang: TargetLang): Promise<string> {
  return (await translateTexts([text], targetLang))[0] ?? text;
}
