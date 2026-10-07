import { translateText } from "./translate";

// Cache sederhana di memory server. Bertahan selama server nyala (dev/production),
// jadi teks yang sama gak ditranslate berkali-kali tiap ada pengunjung.
const cache = new Map<string, string>();

async function cachedTranslate(text: string, lang: "id" | "zh") {
  const key = `${lang}:${text}`;
  if (cache.has(key)) return cache.get(key)!;
  const result = await translateText(text, lang);
  cache.set(key, result);
  return result;
}

// Terima objek { en, id, zh } dari Sanity. Kalau id/zh kosong (admin cuma isi en),
// otomatis diisi hasil translate. Kalau id/zh SUDAH diisi manual, itu dipakai (gak ditimpa AI).
export async function autoTranslate(field?: { en?: string; id?: string; zh?: string }) {
  if (!field?.en) return field;
  const [id, zh] = await Promise.all([
    field.id || cachedTranslate(field.en, "id"),
    field.zh || cachedTranslate(field.en, "zh"),
  ]);
  return { en: field.en, id, zh };
}

// Translate semua field localized di dalam 1 array data (misal semua "project" atau "service")
export async function autoTranslateList<T extends Record<string, any>>(
  items: T[],
  fields: (keyof T)[]
): Promise<T[]> {
  return Promise.all(
    items.map(async (item) => {
      const updated: any = { ...item };
      for (const f of fields) {
        updated[f] = await autoTranslate(item[f] as any);
      }
      return updated;
    })
  );
}
