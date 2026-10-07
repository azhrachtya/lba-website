import { NextResponse } from "next/server";
import { translateText } from "@/lib/translate";

// Endpoint ini dipanggil dari browser (client component ServiceDetail) tiap kali
// bahasa diganti ke ID/中文. API key Google tetap aman di server, gak pernah
// kekirim ke browser — browser cuma manggil endpoint ini.
export async function POST(req: Request) {
  const { texts, lang } = await req.json();
  if (!Array.isArray(texts) || !lang || lang === "en") {
    return NextResponse.json({ translations: texts || [] });
  }
  const translations = await Promise.all(texts.map((t: string) => (t ? translateText(t, lang) : t)));
  return NextResponse.json({ translations });
}
