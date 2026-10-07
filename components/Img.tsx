import { urlFor } from "@/sanity/lib/client";

// Kalau gambar Sanity belum ada, pakai file di /public/images (fallback) supaya testing tetap enak.
export default function Img({ src, fallback, alt = "", className = "", w = 1200 }: { src?: any; fallback?: string; alt?: string; className?: string; w?: number }) {
  const url = src?.asset ? urlFor(src).width(w).auto("format").url() : fallback;
  if (!url) return <div className={`bg-slate-200 ${className}`} aria-hidden />;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={url} alt={alt} className={className} loading="lazy" />;
}
