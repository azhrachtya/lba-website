"use client";
import Img from "./Img";
import { useLang } from "./LangProvider";
import Counter from "./Counter"; 

export default function Hero({ image }: { image?: any }) {
  const { t } = useLang();
  const stats = [[20, t.hero.years], [50, t.hero.ship], [75, t.hero.cont]];  
  return (
    <section id="home" className="relative isolate">
      <video
        className="absolute inset-0 -z-20 h-full w-full object-cover motion-reduce:hidden"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/hero.jpg"
        aria-hidden="true"
      >
        <source src="/videos/hero-bg.mov" type="video/mp4" />
      </video>

      {/* Fallback gambar kalau pengguna pilih reduce motion (video disembunyikan) */}
      <div
        className="absolute inset-0 -z-30 hidden bg-cover bg-center motion-reduce:block"
        style={{ backgroundImage: "url(/images/hero.jpg)" }}
      />

      {/* Lapisan gelap transparan supaya teks putih tetap terbaca */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />
      {/* Logo: pojok kanan atas hero (hanya desktop) */}
      <img
        src="/images/logo.png"
        alt="LBA"
        className="absolute right-8 top-24 z-10 hidden h-24 w-auto md:block xl:right-12 xl:h-28"
      />

      <div className="relative mx-auto flex min-h-[640px] max-w-6xl flex-col px-5 pb-24 pt-24 md:min-h-[720px] md:pb-46">   
        <div className="my-auto max-w-2xl text-left text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.55)]">
          <div className="flex items-center justify-between md:justify-start">
            <span className="rounded-full bg-white px-3 py-1 text-[10px] font-semibold text-slate-900 [text-shadow:none]">{t.hero.est}</span>
            {/* Logo versi HP */}
            <img src="/images/logo.png" alt="LBA" className="-my-2 h-16 w-auto md:hidden" />
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
        </dl>
      </div>
    </section>
  );
}
