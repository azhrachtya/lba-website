"use client";
import { useLang } from "./LangProvider";

export default function WhyLBA() {
  const { t } = useLang();
  return (
    <section className="relative z-10 mx-auto -mt-50 max-w-6xl px-5 pb-20 md:-mt-40">
      <div className="rounded-3xl bg-navy p-10 text-white shadow-2xl md:p-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
          <p className="text-xs font-semibold text-sky-300">WHY LBA</p>
          <h2 className="mt-2 font-head text-2xl md:text-3xl font-bold text-white">Engineered for reliability <br/> across the archipelago</h2>
          </div>
          <p className="pb-1 text-sm text-slate-300">PPJK license, chartering access and on-ground heavy haulage <br/> end to end control in one partner.</p>        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.why.items.map(([title, desc], i) => (
            <div key={title} className="rounded-xl bg-white/90 p-5">
              <span className="text-xs font-semibold text-sky-500">0{i + 1}</span>
              <h3 className="mt-2 font-head text-base font-bold text-navy">{title}</h3>
              <p className="mt-2 text-xs leading-5 text-navy">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
