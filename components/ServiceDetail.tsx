"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ServiceContent, getService } from "@/lib/serviceContent";
import { useLang } from "./LangProvider";
import CTA from "./CTA";

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

export default function ServiceDetail({ s }: { s: ServiceContent }) {
  const { lang, t } = useLang();
  const [tr, setTr] = useState<Record<string, string>>({});

  // Kumpulin SEMUA teks yang perlu ditranslate jadi satu list, sekali jalan
  const allTexts = useMemo(() => {
    const list: string[] = [s.heroTitle, s.heroTagline, s.heroDescription];
    if (s.whatWeHandleTitle) list.push(s.whatWeHandleTitle);
    s.whatWeHandleGroups?.forEach((g) => {
      if (g.heading) list.push(g.heading);
      g.items.forEach((i) => list.push(i.title, i.desc));
    });
    if (s.processTitle) list.push(s.processTitle);
    s.process?.forEach((p) => list.push(p.title, p.desc));
    if (s.capabilitiesTitle) list.push(s.capabilitiesTitle);
    s.capabilities?.forEach((c) => list.push(c.title, c.desc));
    if (s.highlight) list.push(s.highlight.title, s.highlight.desc);
    s.suitableFor?.forEach((t) => list.push(t));
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

  // Helper: pakai hasil translate kalau ada, kalau belum selesai / mode EN, pakai teks asli
  const x = (text: string) => tr[text] || text;

  const heroImage = s.image || `/images/service-${s.slug}.jpg`;

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <img
          src={heroImage}
          alt={x(s.heroTitle)}
          className="absolute inset-0 h-full w-full object-cover"
          onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative mx-auto max-w-4xl px-5 py-24 text-center text-white">
          <p className="text-xs font-semibold uppercase tracking-wide text-sky-300">service</p>
          <h1 className="mt-2 font-head text-4xl font-bold text-white md:text-5xl">{x(s.heroTitle)}</h1>
          <p className="mt-3 text-lg text-slate-200">{x(s.heroTagline)}</p>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-300">{x(s.heroDescription)}</p>
        </div>
      </section>

      {/* WHAT WE HANDLE */}
      {s.whatWeHandleGroups?.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 py-16">
          {s.whatWeHandleTitle && <h2 className="font-head text-2xl font-bold">{x(s.whatWeHandleTitle)}</h2>}
          <div className="mt-8 space-y-10">
            {s.whatWeHandleGroups.map((group, gi) => (
              <div key={gi}>
                {group.heading && <h3 className="mb-4 font-head text-lg font-bold text-brand">{x(group.heading)}</h3>}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {group.items.map((item) => (
                    <div key={item.title} className="rounded-xl border border-slate-200 p-5">
                      <h4 className="font-head text-sm font-bold">{x(item.title)}</h4>
                      <p className="mt-1.5 text-xs leading-5 text-slate-500">{x(item.desc)}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PROCESS */}
      {s.process?.length > 0 && (
        <section className="bg-mist py-16">
          <div className="mx-auto max-w-6xl px-5">
            {s.processTitle && <h2 className="font-head text-2xl font-bold">{x(s.processTitle)}</h2>}
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {s.process.map((step) => (
                <div key={step.num} className="rounded-xl bg-white p-5 shadow-sm">
                  <span className="font-head text-xl font-bold text-brand">{step.num}</span>
                  <h4 className="mt-2 font-head text-sm font-bold">{x(step.title)}</h4>
                  <p className="mt-1.5 text-xs leading-5 text-slate-500">{x(step.desc)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* HIGHLIGHT CALLOUT */}
      {s.highlight && (
        <section className="mx-auto max-w-6xl px-5 py-16">
          <div className="rounded-3xl bg-navy p-10 text-center text-white">
            <h3 className="font-head text-2xl font-bold">{x(s.highlight.title)}</h3>
            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-300">{x(s.highlight.desc)}</p>
          </div>
        </section>
      )}

      {/* CAPABILITIES */}
      {s.capabilities?.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 py-16">
          {s.capabilitiesTitle && <h2 className="font-head text-2xl font-bold">{x(s.capabilitiesTitle)}</h2>}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {s.capabilities.map((c) => (
              <div key={c.title} className="rounded-xl border border-slate-200 p-5">
                <h4 className="font-head text-sm font-bold text-brand">{x(c.title)}</h4>
                <p className="mt-1.5 text-xs leading-5 text-slate-500">{x(c.desc)}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SUITABLE FOR */}
      {s.suitableFor && s.suitableFor.length > 0 && (
        <section className="bg-mist py-16">
          <div className="mx-auto max-w-6xl px-5">
            <h2 className="font-head text-2xl font-bold">Suitable For</h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {s.suitableFor.map((tag) => (
                <span key={tag} className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm">{x(tag)}</span>
              ))}
            </div>
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
              const thumb = r.image || `/images/service-${r.slug}.jpg`;
              return (
                <Link key={slug} href={`/services/${slug}`} className="group overflow-hidden rounded-xl border border-slate-200 transition hover:shadow-md">
                  <div className="relative h-28 w-full overflow-hidden bg-slate-100">
                    <img
                      src={thumb}
                      alt={r.navTitle}
                      className="h-full w-full object-cover transition group-hover:scale-105"
                      onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
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

      {/* CTA */}
      <div id="contact-cta">
        <CTA />
      </div>
    </>
  );
}
