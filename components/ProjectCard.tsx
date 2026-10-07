"use client";
import Img from "./Img";
import { pick } from "@/lib/i18n";
import { useLang } from "./LangProvider";

export default function ProjectCard({ p, onSelect }: { p: any; onSelect: (p: any) => void }) {
  const { lang, t } = useLang();
  return (
    <article
      onClick={() => onSelect(p)}
      className="cursor-pointer overflow-hidden rounded-2xl bg-white shadow-md transition hover:shadow-lg">
      <div className="relative">
        <Img src={p.cover} fallback="/images/project.jpg" className="h-56 w-full object-cover" w={900} />
        <span className="absolute left-3 top-3 rounded bg-slate-900 px-2 py-0.5 text-[10px] font-semibold uppercase text-white">
          {(() => {
            // Pengaman: category seharusnya teks biasa, tapi kalau kebetulan masih
            // kesimpen sebagai objek {en,id,zh} (sisa data lama), ambil versi en-nya aja.
            const key = typeof p.category === "string" ? p.category : p.category?.en;
            return t.categories[key as keyof typeof t.categories] || key || "";
          })()}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-head text-lg font-bold">{pick(p.title, lang)}</h3>
        {p.subtitle && <p className="mt-1 text-sm text-slate-500">{pick(p.subtitle, lang)}</p>}
        {p.client && <p className="mt-3 text-xs font-semibold text-slate-400">{t.portfolio.client}: {pick(p.client, lang)}</p>}      </div>
    </article>
  );
}
