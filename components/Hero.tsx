"use client";
import Img from "./Img";
import { useLang } from "./LangProvider";
import Counter from "./Counter"; 

export default function Hero({ image }: { image?: any }) {
  const { t } = useLang();
  const stats = [[100, t.hero.proj], [50, t.hero.ship]];  
  return (
    <section id="home" className="relative isolate flex min-h-screen min-h-[100svh] flex-col overflow-hidden">
      <video
        className="absolute inset-0 -z-20 h-full w-full object-cover motion-reduce:hidden"
        autoPlay muted loop playsInline preload="metadata" poster="/images/hero.jpg" aria-hidden="true"
      >
        <source src="/videos/hero-bg.webm" type="video/webm" />
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>

      <div
        className="absolute inset-0 -z-30 hidden bg-cover bg-center motion-reduce:block"
        style={{ backgroundImage: "url(/images/hero.jpg)" }}
      />

      {/* Satu lapisan saja: gelap di atas, memudar ke mist di dasar. Tidak ada sambungan = tidak ada garis */}
      <div
        className="absolute inset-0 -z-10"
        style={{
background:
  "linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(2,6,23,0.6) 35%, rgba(2,6,23,0.4) 62%, rgba(239,244,251,0) 70%, #eff4fb 100%)",        }}
      />

      {/* Transisi halus: menempel di dasar video yang menjorok */}
      <div className="pointer-events-none absolute inset-x-0 -bottom-32 z-0 h-56 bg-gradient-to-b from-transparent to-mist md:-bottom-32 md:h-72" />

      {/* Logo: pojok kanan atas hero (hanya desktop) */}
      <img
        src="/images/logo.png"
        alt="LBA"
        className="absolute right-8 top-24 z-10 hidden h-24 w-auto md:block xl:right-12 xl:h-28"
      />

        <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 pb-32 pt-24 md:pb-40 md:pt-28">
          <div className="max-w-2xl text-left text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.55)] md:my-auto">
            <div className="flex flex-col items-start gap-4 md:block">
              {/* Logo HP: di atas, kanan */}
              <img
                src="/images/logo.png"
                alt="LBA"
                className="ml-auto h-20 w-auto rounded-xl p-2 md:hidden"
              />
              {/* Badge di bawah logo */}
              <span className="rounded-full bg-white px-3 py-1 text-[10px] font-semibold text-slate-900 [text-shadow:none]">
                {t.hero.est}
              </span>
            </div>
          <h1 className="mt-6 font-head text-5xl font-bold leading-[1.1] text-white">{t.hero.title}</h1>
          <p className="mt-3 text-lg font-medium text-slate-100">{t.hero.body}</p>
          <p className="mt-4 text-sm leading-relaxed text-slate-100">{t.hero.sub}</p>
        </div>

        {/* Bawah: statistik rata tengah */}
        <dl className="mt-12 flex justify-center gap-10 text-center text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.55)] md:gap-16">
          {stats.map(([n, l]) => (
            <div key={l}>
              <dt className="font-head text-3xl font-bold text-white md:text-4xl">
                <Counter to={n as number} suffix="+" />
              </dt>
              <dd className="mt-1 text-xs text-slate-100 md:text-sm">{l}</dd>
            </div>
          ))}
          <p className="mt-1 text-3xl font-bold text-white md:text-3xl">{t.hero.cont} </p>
        </dl>
      </div>
    </section>
  );
}
