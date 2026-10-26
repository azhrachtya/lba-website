export function optimize(url?: string, w = 1400, q = 75) {
  if (!url || !url.includes("cdn.sanity.io")) return url; // foto lokal nggak diubah
  const u = new URL(url);
  u.searchParams.set("auto", "format"); // otomatis WebP/AVIF
  u.searchParams.set("w", String(w));   // lebar maksimal
  u.searchParams.set("q", String(q));   // kualitas
  return u.toString();
}