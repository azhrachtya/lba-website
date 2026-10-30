"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ServiceContent, getService } from "@/lib/serviceContent";
import { useLang } from "./LangProvider";

// Cache di memory browser (per sesi) biar translate yang sama gak dipanggil ulang
// tiap kali ganti-ganti bahasa bolak-balik.
const cache = new Map<string, string>();

async function translateBatch(texts: string[], lang: "id" | "zh") {
  const need = texts.filter((t) => t && !cache.has(`${lang}:${t}`));
  if (need.length > 0) {
    const res = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texts: need, lang }),
    });
    const data = await res.json();
    need.forEach((t, i) => cache.set(`${lang}:${t}`, data.translations[i] || t));
  }
  return texts.map((t) => (t ? cache.get(`${lang}:${t}`) || t : t));
}

export default function ServiceDetail({
  s,
  images = {},
  heroImages = {},
}: {
  s: ServiceContent;
  images?: Record<string, any>;
  heroImages?: Record<string, any>;
}) {
  const { lang, t, lp } = useLang();
  const [tr, setTr] = useState<Record<string, string>>({});

  // Kumpulin SEMUA teks yang perlu ditranslate jadi satu list, sekali jalan
  const allTexts = useMemo(() => {
    const list: string[] = [s.heroTitle, s.heroTagline, s.heroDescription, s.navTitle];
    if (s.whatWeHandleTitle) list.push(s.whatWeHandleTitle);
    s.whatWeHandleGroups?.forEach((g) => {
      if (g.heading) list.push(g.heading);
      g.items.forEach((i) => list.push(i.title, i.desc));
    });
    s.relatedSlugs?.forEach((slug) => {
      const r = getService(slug);
      if (r) list.push(r.navTitle);
    });
    return Array.from(new Set(list));
  }, [s]);

  useEffect(() => {
    if (lang === "en") {
      setTr({});
      return;
    }
    let cancelled = false;
    translateBatch(allTexts, lang).then((translated) => {
      if (cancelled) return;
      const map: Record<string, string> = {};
      allTexts.forEach((orig, i) => (map[orig] = translated[i]));
      setTr(map);
    });
    return () => {
      cancelled = true;
    };
  }, [lang, allTexts]);

  // Pakai hasil translate kalau ada; kalau belum selesai / mode EN, pakai teks asli
  const x = (text: string) => tr[text] || text;

  // URL gambar dari Sanity (dengan lebar tertentu), atau gambar statis kalau belum ada
  const pic = (slug: string, fallback: string, w: number) =>
    images[slug] ? `${images[slug]}?w=${w}&q=75&auto=format` : fallback;

  // Kalau gambar Sanity gagal dimuat, kembali ke gambar statis (sekali saja)
  const useFallback = (fallback: string) => (e: React.SyntheticEvent<HTMLImageElement>) => {
    const el = e.currentTarget;
    if (el.dataset.fell) {
      el.style.display = "none";
      return;
    }
    el.dataset.fell = "1";
    el.src = fallback;
  };

  const fb = s.image || `/images/service-${s.slug}.jpg`;
  // Prioritas: hero image dari CMS, lalu gambar statis
  const heroSrc = heroImages[s.slug] ? `${heroImages[s.slug]}?w=1600&q=75&auto=format` : fb;

  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-[560px] items-center overflow-hidden bg-slate-900 md:min-h-[620px]">
        <img
          src={heroSrc}
          alt={x(s.heroTitle)}
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
          onError={useFallback(fb)}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative mx-auto w-full max-w-4xl px-5 pb-16 pt-28 text-center text-white">
          <h1 className="font-head text-4xl font-bold text-white md:text-5xl">{x(s.heroTitle)}</h1>
          <p className="mt-3 text-lg text-slate-200">{x(s.heroTagline)}</p>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-300">{x(s.heroDescription)}</p>

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mt-8 flex justify-center">
            <ol className="inline-flex flex-wrap items-center justify-center gap-1.5 px-4 py-2 text-xs text-white/80 [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">
              <li>
                <Link href={lp("/")} className="transition hover:text-white">{t.nav.home}</Link>
              </li>
              <li aria-hidden="true" className="text-white/40">›</li>
              <li>
                <Link href={lp("/#services")} className="transition hover:text-white">{t.services.tag}</Link>
              </li>
              <li aria-hidden="true" className="text-white/40">›</li>
              <li aria-current="page" className="font-semibold text-white">{x(s.navTitle)}</li>
            </ol>
          </nav>
        </div>
      </section>

      {/* WHAT WE HANDLE — daftar bernomor, tanpa card */}
      {s.whatWeHandleGroups?.length > 0 && (
        <section className="mx-auto max-w-4xl px-5 py-16">
          {s.whatWeHandleTitle && <h2 className="font-head text-2xl font-bold">{x(s.whatWeHandleTitle)}</h2>}
          <div className="mt-8 space-y-10">
            {s.whatWeHandleGroups.map((group, gi) => (
              <div key={gi}>
                {group.heading && <h3 className="mb-4 font-head text-lg font-bold text-brand">{x(group.heading)}</h3>}
                <ol className="divide-y divide-slate-200 border-y border-slate-200">
                  {group.items.map((item, i) => (
                    <li key={item.title} className="flex gap-5 py-6">
                      <span className="font-head text-xl font-bold text-brand">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="font-head text-base font-bold">{x(item.title)}</h3>
                        <p className="mt-1.5 text-sm leading-6 text-slate-500">{x(item.desc)}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* RELATED SERVICES */}
      {s.relatedSlugs?.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="font-head text-2xl font-bold">{t.serviceDetail.related}</h2>
          <p className="mt-2 text-sm text-slate-500">{t.serviceDetail.relatedDesc}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {s.relatedSlugs.map((slug) => {
              const r = getService(slug);
              if (!r) return null;
              const rfb = r.image || `/images/service-${r.slug}.jpg`;
              return (
                <Link
                  key={slug}
                  href={lp(`/services/${slug}`)}
                  className="group overflow-hidden rounded-xl border border-slate-200 transition hover:shadow-md"
                >
                  <div className="relative h-28 w-full overflow-hidden bg-slate-100">
                    <img
                      src={pic(r.slug, rfb, 400)}
                      alt={r.navTitle}
                      className="h-full w-full object-cover transition group-hover:scale-105"
                      onError={useFallback(rfb)}
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-head text-sm font-bold group-hover:text-brand">{x(r.navTitle)}</h4>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </>
  );
}
