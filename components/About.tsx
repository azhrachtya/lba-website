"use client";
import Img from "./Img";
import { useLang } from "./LangProvider";

export default function About({ image }: { image?: any }) {
  const { t } = useLang();
  return (
    <section id="about" className="bg-mist py-16 pb-50 md:pb-60">
      <div className="mx-auto grid max-w-6xl items-start gap-10 px-5 md:grid-cols-[380px_1fr]">
        <Img src={image} fallback="/images/about.png" className="h-72 w-full rounded-2xl object-cover shadow-md" />

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-brand">{t.about.tag}</p>
          <h2 className="mt-2 font-head text-3xl font-bold leading-tight md:text-4xl">{t.about.title}</h2>

          {/* Kalau teks about mau dipecah 2 paragraf kayak Figma, edit di lib/i18n.ts */}
          <div className="mt-4 max-w-prose space-y-3 text-sm leading-7 text-slate-600">
            {t.about.body.map((para, i) => <p key={i}>{para}</p>)}
          </div>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              "Safety first for cargo and crew",
              "On-time delivery with updates",
              "Transparent costing & compliance",
              "Flexible solutions for remote sites",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2.5 rounded-lg bg-white px-3.5 py-2.5 shadow-sm">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/10 text-[10px] font-bold text-brand">
                  ✓
                </span>
                <span className="text-xs font-medium leading-snug text-slate-800">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
