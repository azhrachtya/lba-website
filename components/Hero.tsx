"use client";
import { useLang } from "./LangProvider";
import Counter from "./Counter";
import LazyBgVideo from "./LazyBgVideo";
import { urlFor } from "@/sanity/lib/client";

export default function Hero({
  image,
  videoMp4,
  videoWebm,
}: {
  image?: Parameters<typeof urlFor>[0];
  videoMp4?: string;
  videoWebm?: string;
}) {
  const { t } = useLang();
  const stats = [[100, t.hero.proj], [50, t.hero.ship]];
  const poster = typeof image === "string" && image
    ? image
    : image?.asset
      ? urlFor(image).width(1290).fit("max").format("webp").quality(75).url()
      : "/images/hero.webp";
  const hasCmsVideo = Boolean(videoMp4 || videoWebm);

  // "All Indonesia Coverage" -> baris 1 "All Indonesia", baris 2 "Coverage"
  const words = String(t.hero.cont ?? "").trim().split(" ");
  const contTop = words.length > 1 ? words.slice(0, -1).join(" ") : words[0];
  const contBottom = words.length > 1 ? words[words.length - 1] : "";

  return (
    <section id="home" className="relative isolate flex min-h-screen min-h-[100svh] flex-col overflow-hidden">
      <img
        src={poster}
        alt=""
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 -z-30 h-full w-full object-cover"
      />
      <LazyBgVideo
        className="absolute inset-0 -z-20 h-full w-full object-cover motion-reduce:hidden"
        webm={hasCmsVideo ? videoWebm : "/videos/hero-bg.webm"}
        mp4={hasCmsVideo ? videoMp4 : "/videos/hero-bg.mp4"}
      />

      {/* Lapisan hitam tipis supaya teks & navbar putih terbaca */}
     <div aria-hidden="true" className="absolute inset-0 -z-[15] bg-black/45 md:bg-black/20" />
<div
  aria-hidden="true"
  className="absolute inset-0 -z-[14] hidden bg-gradient-to-r from-black/50 via-black/15 to-transparent md:block"
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

      {/* Logo: kanan atas, di bawah navbar (HP dan desktop memakai satu logo ini) */}
      <img
        src="/images/logo-336.webp"
        width={336} height={224}
        alt="LBA"
        decoding="async"
        className="absolute right-5 top-24 z-10 h-16 w-auto md:right-8 md:h-24 xl:right-12 xl:h-28"
      />

      {/*
        HP: tiga blok (judul, deskripsi, statistik) disebar merata dengan justify-between,
        jadi jedanya proporsional dan posisinya sama di semua bahasa.
        Desktop (md ke atas): tampilan lama.
      */}
      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-between gap-8 px-5 pb-[22svh] pt-56 md:justify-between md:gap-0 md:pb-32 md:pt-40">
             {/* "contents" di HP: judul dan deskripsi jadi dua blok terpisah; di desktop jadi satu blok */}
<div className="contents text-left text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.55)] md:flex md:flex-col md:my-auto md:max-w-3xl md:gap-5">
          <h1 className="font-head text-5xl font-bold leading-[1.1] text-white md:text-6xl">
            {t.hero.title}
          </h1>

          <p className="text-xl font-medium text-slate-100 md:text-2xl">
            {t.hero.body}
          </p>

          <p className="max-w-2xl text-base leading-relaxed text-slate-100 md:text-lg">
            {t.hero.sub}
          </p>
      </div>

        {/* Statistik */}
        <dl className="grid grid-cols-3 items-start gap-x-3 gap-y-6 text-center text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.55)] sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-12 md:mt-12 md:gap-x-16">
          {stats.map(([n, l]) => (
            <div key={l}>
              <dt className="font-head text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                <Counter to={n as number} suffix="+" />
              </dt>
              <dd className="mt-1 text-xs text-slate-100 md:text-sm">{l}</dd>
            </div>
          ))}

          {/* All Indonesia / Coverage: 2 baris */}
          <div>
            <dt className="font-head text-base font-bold leading-tight text-white sm:text-lg md:text-2xl">
              <span className="block">{contTop}</span>
              {contBottom && <span className="block">{contBottom}</span>}
            </dt>
          </div>
        </dl>
      </div>
    </section>
  );
}