// Panggil Google Cloud Translation API (v2, pakai API key — paling simpel, cocok buat testing/free tier)
export async function translateText(text: string, targetLang: "id" | "zh"): Promise<string> {
  const key = process.env.GOOGLE_TRANSLATE_API_KEY;
  if (!key || !text) return text; // kalau API key belum diisi / teks kosong, kembalikan aslinya (gak crash)

  try {
    const res = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${key}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ q: text, source: "en", target: targetLang, format: "text" }),
    });
    const data = await res.json();
    if (data?.error) {
      console.error("❌ GOOGLE TRANSLATE ERROR:", JSON.stringify(data.error));
      return text;
    }
    return data?.data?.translations?.[0]?.translatedText || text;
  } catch (e) {
    console.error("❌ GOOGLE TRANSLATE EXCEPTION:", e);
    return text; // kalau API error/kuota habis, web tetap jalan pakai teks Inggris
  }
}
