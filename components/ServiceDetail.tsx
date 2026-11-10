"use client";
import Link from "next/link";
import { ServiceContent, getService } from "@/lib/serviceContent";
import { localize } from "@/lib/serviceTranslations";
import { useLang } from "./LangProvider";

export default function ServiceDetail({
  s, images = {}, heroImages = {}, preLocalized = false, relatedCards = [],
}: {
  s: ServiceContent;
  images?: Record<string, any>;
  heroImages?: Record<string, any>;
  preLocalized?: boolean;
  relatedCards?: { slug: string; title: string; image?: string }[];
}) {
  const { lang, t, lp } = useLang();
  const sv = preLocalized ? s : localize(s, lang);

  // URL gambar dari Sanity (dengan lebar tertentu), atau gambar statis kalau belum ada
  const pic = (slug: string, fallback: string, w: number) => {
  if (!images[slug]) return fallback;

  const url = new URL(images[slug]);
  url.searchParams.set("w", String(w));
  url.searchParams.set("q", "75");
  url.searchParams.set("fit", "max");
  url.searchParams.set("auto", "format");

  return url.toString();
};

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

const defaultImg = "/images/service-1.jpeg";

const codeCards = (s.relatedSlugs || [])
  .map((slug) => {
    const r0 = getService(slug);
    if (!r0) return null;
    const r = localize(r0, lang);
    const rfb = r.image || `/images/service-${r.slug}.jpg`;
    return { slug, title: r.navTitle, src: pic(r.slug, rfb, 400), fb: rfb };
  })
  .filter(Boolean) as { slug: string; title: string; src: string; fb: string }[];

const cmsCards = relatedCards.map((c) => ({
  slug: c.slug,
  title: c.title,
  src: c.image ? sized(c.image, 400) : defaultImg,
  fb: defaultImg,
}));

const seen = new Set<string>();
const cards = [...codeCards, ...cmsCards].filter((c) => {
  if (seen.has(c.slug)) return false;
  seen.add(c.slug);
  return true;
});

  const fb = s.image || `/images/service-${s.slug}.jpg`;
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
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative mx-auto w-full max-w-4xl px-5 pb-16 pt-28 text-center text-white">
          <h1 className="font-head text-4xl font-bold text-white md:text-5xl">{sv.heroTitle}</h1>
          <p className="mt-3 text-lg text-slate-200">{sv.heroTagline}</p>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-300">{sv.heroDescription}</p>

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
              <li aria-current="page" className="font-semibold text-white">{sv.navTitle}</li>
            </ol>
          </nav>
        </div>
      </section>

      {/* WHAT WE HANDLE — daftar bernomor, tanpa card */}
      {sv.whatWeHandleGroups?.length > 0 && (
        <section className="mx-auto max-w-4xl px-5 py-16">
          {sv.whatWeHandleTitle && <h2 className="font-head text-2xl font-bold">{sv.whatWeHandleTitle}</h2>}
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
{cards.length > 0 && (
  <section className="mx-auto max-w-6xl px-5 py-16">
    <h2 className="font-head text-2xl font-bold">{t.serviceDetail.related}</h2>
    <p className="mt-2 text-sm text-slate-500">{t.serviceDetail.relatedDesc}</p>
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((c) => (
        <Link
          key={c.slug}
          href={lp(`/services/${c.slug}`)}
          className="group overflow-hidden rounded-xl border border-slate-200 transition hover:shadow-md"
        >
          <div className="relative h-28 w-full overflow-hidden bg-slate-100">
            <img
              src={c.src}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition group-hover:scale-105"
              onError={imgFallback(c.fb)}
            />
          </div>
          <div className="p-4">
            <h3 className="font-head text-sm font-bold group-hover:text-brand">{c.title}</h3>
          </div>
        </Link>
      ))}
    </div>
  </section>
)}
    </>
  );
}