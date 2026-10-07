"use client";
import Img from "./Img";
import { useLang } from "./LangProvider";

export default function Hero({ image }: { image?: any }) {
  const { t } = useLang();
  const stats = [["9+", t.hero.years], ["50+", t.hero.ship], ["75+", t.hero.cont]];
  return (
    <section id="home" className="relative">
      <Img src={image} fallback="/images/hero.jpg" alt="" w={2000} className="absolute inset-0 h-full w-full object-cover" />
      <img
        src="/images/logo.png"
        alt="Partner logo"
        className="absolute right-6 top-6 z-10 h-14 w-auto object-contain md:right-10 md:top-8 md:h-20"
        onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
      />

      <div className="relative mx-auto flex min-h-[560px] max-w-6xl items-center px-5 py-16">
        <div className="max-w-xl rounded-3xl border border-white/40 bg-white/70 p-8 shadow-xl backdrop-blur-md">
          <span className="rounded-full bg-slate-900 px-3 py-1 text-[10px] font-semibold text-white">{t.hero.est}</span>
          <h1 className="mt-4 font-head text-5xl font-bold leading-[1.1] text-brand">{t.hero.title}</h1>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">{t.hero.sub}</p>
          <dl className="mt-6 flex gap-8">
            {stats.map(([n, l]) => (
              <div key={l}>
                <dt className="font-head text-2xl font-bold text-brand">{n}</dt>
                <dd className="text-[11px] text-slate-500">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
