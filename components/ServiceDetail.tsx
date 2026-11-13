"use client";
import Link from "next/link";
import type { ServiceContent } from "@/lib/serviceContent";
import type { RelatedCard } from "@/lib/serviceFromSanity";
import { localize } from "@/lib/serviceTranslations";
import { useLang } from "./LangProvider";

export default function ServiceDetail({
  s, heroImages = {}, preLocalized = false, relatedCards,
}: {
  s: ServiceContent;
  heroImages?: Record<string, any>;
  preLocalized?: boolean;
  relatedCards: RelatedCard[];
}) {
  const { lang, t, lp } = useLang();
  const sv = preLocalized ? s : localize(s, lang);

  // Kalau gambar Sanity gagal dimuat, kembali ke gambar statis (sekali saja)
  const imgFallback = (fallback: string) => (e: React.SyntheticEvent<HTMLImageElement>) => {
    const el = e.currentTarget;
    el.removeAttribute("srcset"); // srcset harus dibuang, kalau tidak, src baru diabaikan
    if (el.dataset.fell) {
      el.style.display = "none";
      return;
    }
    el.dataset.fell = "1";
    el.src = fallback;
  };

  const sized = (url: string, w: number) => {
  try {
    const u = new URL(url);
    u.searchParams.set("w", String(w));
    u.searchParams.set("q", "75");
    u.searchParams.set("fit", "max");
    u.searchParams.set("auto", "format");
    return u.toString();
  } catch {
    return url;
  }
};

  const fb = s.image || "/images/hero.webp";
  // Prioritas: hero image dari CMS, lalu gambar statis
  const heroBase = heroImages[s.slug] as string | undefined;
  const heroSrc = heroBase
    ? `${heroBase}${heroBase.includes("?") ? "&" : "?"}w=1200&q=75&fit=max&auto=format`
    : fb;  
  // Ukuran berbeda untuk HP / tablet / desktop
  const heroSrcSet = heroBase
  ? [640, 960, 1280, 1600]
      .map((w) => {
        const separator = heroBase.includes("?") ? "&" : "?";
        return `${heroBase}${separator}w=${w}&q=75&fit=max&auto=format ${w}w`;
      })
      .join(", ")
  : undefined;

  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-[560px] items-center overflow-hidden bg-slate-900 md:min-h-[620px]">
        <img
          src={heroSrc}
          srcSet={heroSrcSet}
          sizes="100vw"
          alt={sv.heroTitle}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
          onError={imgFallback(fb)}
        />
        <div className="absolute inset-0 bg-black/30" />

          <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center px-5 pb-20 pt-28 text-center text-white md:pt-32 md:pb-24">

            {/* Hero Title */}
            <h1 className="font-head text-4xl font-bold leading-tight text-white md:text-5xl">
              {sv.heroTitle}
            </h1>

            {/* Hero Tagline */}
            <p className="mt-5 text-xl leading-relaxed text-slate-200 md:text-2xl">
              {sv.heroTagline}
            </p>

            {/* Hero Description */}
            <p className="mx-auto mt-6 w-full max-w-4xl text-base leading-7 text-white/90 md:text-lg md:leading-8">
              {sv.heroDescription}
            </p>

            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mt-10 flex justify-center">
              <ol className="inline-flex flex-wrap items-center justify-center gap-2 px-2 py-2 text-sm text-white/80 [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">
                <li>
                  <Link href={lp("/")} className="transition hover:text-white">
                    {t.nav.home}
                  </Link>
                </li>
              <li aria-hidden="true" className="text-white/40">›</li>
              <li>
                <Link href={lp("/#services")} className="transition hover:text-white">{t.services.tag}</Link>
              </li>
              <li aria-hidden="true" className="text-white/40">›</li>
              <li aria-current="page" className="font-semibold text-white">{sv.navTitle}</li>
            </ol>
          </nav>
        </div>
      </section>

      {/* WHAT WE HANDLE — daftar bernomor, tanpa card */}
      {sv.whatWeHandleGroups?.length > 0 && (
        <section className="mx-auto max-w-4xl px-5 py-16">
        <h2 className="font-head text-2xl font-bold">{t.serviceDetail.whatWeHandle}</h2>
          <div className="mt-8 space-y-10">
            {sv.whatWeHandleGroups.map((group, gi) => (
              <div key={gi}>
                {group.heading && <h3 className="mb-4 font-head text-lg font-bold text-brand">{group.heading}</h3>}
                <ol className="divide-y divide-slate-200 border-y border-slate-200">
                  {group.items.map((item, i) => (
                    <li key={item.title} className="flex gap-5 py-6">
                      <span className="font-head text-xl font-bold text-brand">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="font-head text-base font-bold">{item.title}</h3>
                        <p className="mt-1.5 text-sm leading-6 text-slate-500">{item.desc}</p>
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
      {relatedCards.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="font-head text-2xl font-bold">{t.serviceDetail.related}</h2>
          <p className="mt-2 text-sm text-slate-500">{t.serviceDetail.relatedDesc}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {relatedCards.map((card) => (
              <Link
                key={card.slug}
                href={lp(`/services/${card.slug}`)}
                className="group overflow-hidden rounded-xl border border-slate-200 transition hover:shadow-md"
              >
                {card.image && (
                  <div className="relative h-28 w-full overflow-hidden bg-slate-100">
                    <img
                      src={sized(card.image, 400)}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-head text-sm font-bold group-hover:text-brand">{card.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}