"use client";
import Img from "./Img";
import { pick } from "@/lib/i18n";
import { useLang } from "./LangProvider";

export default function ProjectModal({ p, onClose }: { p: any; onClose: () => void }) {
  const { t, lang } = useLang();
  const title = pick(p.title, lang) || pick(p.client, lang);
  const subtitle = pick(p.subtitle, lang);
  const description = pick(p.description, lang);

  const fields = [
  { label: t.portfolio.client, value: pick(p.client, lang) || p.client || "" },
  { label: t.portfolio.consignee, value: pick(p.consignee, lang) || p.consignee || "" },
  { label: t.portfolio.cargoType, value: pick(p.cargoType, lang) || p.cargoType || "" },
  { label: t.portfolio.route, value: pick(p.route, lang) || p.route || "" },
  { label: t.portfolio.mode, value: pick(p.mode, lang) || p.mode || "" },
].filter((f) => f.value);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <span className="rounded-full bg-slate-900 px-3 py-1 text-[10px] font-semibold uppercase text-white">
            {(() => {
              const key = typeof p.category === "string" ? p.category : p.category?.en;
              return t.categories[key as keyof typeof t.categories] || key || "";
            })()}
          </span>
          <button onClick={onClose} aria-label="Close" className="text-2xl leading-none text-slate-400 hover:text-slate-900">×</button>
        </div>

        <h3 className="mt-4 font-head text-2xl font-bold">{title}</h3>
        {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
        {description && <p className="mt-3 text-sm italic leading-relaxed text-slate-600">"{description}"</p>}

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {fields.map((f) => (
            <div key={f.label as string} className="rounded-lg border border-slate-200 px-4 py-3 text-sm">
              <span className="font-semibold text-slate-900">{f.label}: </span>
              <span className="whitespace-pre-line text-slate-600">{f.value}</span>
            </div>
          ))}
        </div>

        {p.gallery?.length > 0 && (
          <>
            <p className="mt-8 text-xs font-semibold uppercase tracking-wide text-slate-400">{t.portfolio.docs}</p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {p.gallery.map((g: any, i: number) => (
                <Img key={i} src={g} className="h-32 w-full rounded-lg object-cover" w={500} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
