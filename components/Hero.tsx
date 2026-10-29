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
        autoPlay muted loop playsInline preload="auto" poster="/images/hero.webp" aria-hidden="true"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
        <source src="/videos/hero-bg.webm" type="video/webm" />
      </video>

      <div
        className="absolute inset-0 -z-30 hidden bg-cover bg-center motion-reduce:block"
        style={{ backgroundImage: "url(/images/hero.webp)" }}
      />

      {/* Satu lapisan saja: gelap di atas, memudar ke mist di dasar. Tidak ada sambungan = tidak ada garis */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(2,6,23,0) 0%, rgba(2,6,23,0.1) 25%, rgba(2,6,23,0.4) 45%, rgba(2,6,23,0.45) 62%, rgba(239,244,251,0) 70%, #eff4fb 100%)",
        }}
      />
      {/* Transisi halus: menempel di dasar video yang menjorok */}
      <div className="pointer-events-none absolute inset-x-0 -bottom-32 z-0 h-56 bg-gradient-to-b from-transparent to-mist md:-bottom-32 md:h-72" />

      {/* Logo: pojok kanan atas hero (hanya desktop) */}
      <img
        src="/images/logo.webp"
        alt="LBA"
        className="absolute right-8 top-24 z-10 hidden h-24 w-auto md:block xl:right-12 xl:h-28"
      />

        <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 pb-32 pt-24 md:pb-40 md:pt-28">
          <div className="max-w-3xl text-left text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.55)] md:my-auto">
              <div className="flex flex-col items-start gap-4 md:block">
                {/* Logo HP: di atas, kanan */}
                <img
                  src="/images/logo.webp"
                  alt="LBA"
                  className="ml-auto h-20 w-auto rounded-xl p-2 md:hidden"
                />
              </div>

              <h1 className="mt-6 font-head text-5xl font-bold leading-[1.1] text-white md:text-6xl">
                {t.hero.title}
              </h1>

              <p className="mt-3 text-xl font-medium text-slate-100 md:text-2xl">
                {t.hero.body}
              </p>

              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-100 md:text-lg">
                {t.hero.sub}
              </p>
            </div>

        {/* Bawah: statistik rata tengah */}
{(() => {
  // "All Indonesia Coverage" -> baris 1 "All Indonesia", baris 2 "Coverage"
  const words = String(t.hero.cont ?? "").trim().split(" ");
  const contTop = words.length > 1 ? words.slice(0, -1).join(" ") : words[0];
  const contBottom = words.length > 1 ? words[words.length - 1] : "";

  return (
    <dl className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-6 text-center text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.55)] md:gap-x-16">
      {stats.map(([n, l]) => (
        <div key={l}>
          <dt className="font-head text-2xl font-bold text-white sm:text-3xl md:text-4xl">
            <Counter to={n as number} suffix="+" />
          </dt>
          <dd className="mt-1 text-xs text-slate-100 md:text-sm">{l}</dd>
        </div>
      ))}

      {/* All Indonesia / Coverage: 2 baris, tingginya setara 50+ sampai Ports & Sites */}
      <div>
        <dt className="font-head text-base font-bold leading-tight text-white sm:text-lg md:text-2xl">
          <span className="block">{contTop}</span>
          {contBottom && <span className="block">{contBottom}</span>}
        </dt>
      </div>
    </dl>
  );
})()}
      </div>
    </section>
  );
}
