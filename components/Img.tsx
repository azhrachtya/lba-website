import { urlFor } from "@/sanity/lib/client";

// Kalau gambar Sanity belum ada, pakai file di /public/images (fallback) supaya testing tetap enak.
export default function Img({
  src,
  fallback,
  alt = "",
  className = "",
  w = 1200,
  sizes,
  priority = false, // true = gambar di atas layar: langsung dimuat, tidak lazy
}: {
  src?: any;
  fallback?: string;
  alt?: string;
  className?: string;
  w?: number;
  sizes?: string;
  priority?: boolean;
}) {
  const loading = priority ? ("eager" as const) : ("lazy" as const);
  const fetchPriority = priority ? ("high" as const) : ("auto" as const);

  // Tanpa gambar Sanity: pakai file lokal
  if (!src?.asset) {
    if (!fallback) return <div className={`bg-slate-200 ${className}`} aria-hidden />;
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={fallback} alt={alt} className={className} loading={loading} fetchPriority={fetchPriority} decoding="async" />;
  }

  const make = (width: number) => urlFor(src).width(width).fit("max").quality(75).auto("format").url();

  // Tiga ukuran, browser memilih yang pas dengan layar
  const widths = Array.from(new Set([Math.round(w / 3), Math.round((w * 2) / 3), w]));
  const srcSet = widths.map((x) => `${make(x)} ${x}w`).join(", ");

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={make(w)}
      srcSet={srcSet}
      sizes={sizes ?? `(min-width: 768px) ${Math.round(w / 2)}px, 100vw`}
      alt={alt}
      className={className}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding="async"
    />
  );
}