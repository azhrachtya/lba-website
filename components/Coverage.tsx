"use client";
import { useEffect, useState } from "react";
import { coverageRegions } from "@/lib/defaults";
import { useLang } from "./LangProvider";

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

export default function Coverage() {
  const { t, lang } = useLang();
  const [tr, setTr] = useState<Record<string, string>>({});

  useEffect(() => {
    if (lang === "en") return setTr({});
    const texts = coverageRegions.map((r) => r.category);
    let cancelled = false;
    translateBatch(texts, lang).then((translated) => {
      if (cancelled) return;
      const map: Record<string, string> = {};
      texts.forEach((orig, i) => (map[orig] = translated[i]));
      setTr(map);
    });
    return () => { cancelled = true; };
  }, [lang]);

  const x = (text: string) => tr[text] || text;

  return (
        <section id="coverage" className="bg-map-blue py-20 text-white">
        <div className="mx-auto max-w-6xl px-5">
        <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-[10px] font-semibold tracking-wide text-sky-300">
          {t.coverage.tag.toUpperCase()}
        </span>

        <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="max-w-md font-head text-3xl font-bold text-white md:text-4xl">{t.coverage.title}</h2>
            <p className="mt-3 max-w-md text-sm text-slate-300">{t.coverage.sub}</p>
          </div>

          <div className="flex gap-5 text-xs text-slate-300">
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500" /> {t.coverage.hub}
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" /> {t.coverage.destination}
            </span>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <img
            src="/images/indonesia-map.png"
            alt="Indonesia coverage map"
            className="w-full max-w-4xl h-auto object-contain"
            onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
          />
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {coverageRegions.map((r) => (
            <div key={r.name} className="rounded-xl bg-white p-5 text-slate-900 shadow-sm">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{x(r.category)}</p>
              <h3 className="mt-1 font-head text-base font-bold">{r.name}</h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {r.ports.map((port) => (
                  <span key={port} className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">
                    {port}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-8 rounded-2xl bg-white p-6 text-slate-900">
          <div>
            <p className="font-head text-2xl font-bold">34+</p>
            <p className="text-[11px] text-slate-500">{t.coverage.ports}</p>
          </div>
          <div>
            <p className="font-head text-2xl font-bold">All 7</p>
            <p className="text-[11px] text-slate-500">{t.coverage.islandGroup}</p>
          </div>
          <div>
            <p className="font-head text-2xl font-bold">Sabang — Merauke</p>
            <p className="text-[11px] text-slate-500">{t.coverage.endToEnd}</p>
          </div>
          <p className="ml-auto max-w-xs text-xs text-slate-500">{t.coverage.desc}</p>
        </div>
      </div>
    </section>
  );
}
