"use client";
import { useLang } from "./LangProvider";

export default function WhyLBA() {
  const { t } = useLang();
  return (
    <section className="relative z-10 mx-auto -mt-50 max-w-6xl px-5 pb-20 md:-mt-40">
      <div className="rounded-3xl bg-navy p-10 text-white shadow-2xl md:p-12">
        <div className="grid grid-cols-1 items-end gap-6 md:grid-cols-2 md:gap-12">
          {/* KIRI — JUDUL */}
          <div>
            <p className="text-xs font-semibold text-sky-300">
              {t.why.title}
            </p>

            <h2 className="mt-2 max-w-lg font-head text-2xl font-bold text-white md:text-3xl">
              {t.why.sub}
            </h2>
          </div>

          {/* KANAN — DESKRIPSI */}
          <p className="max-w-xl pb-1 text-sm leading-6 text-slate-300">
            {t.why.desc}
          </p>
        </div>
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
