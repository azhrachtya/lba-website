"use client";

import { useLang } from "./LangProvider";

export default function ProjectsHeader() {
  const { t } = useLang();

  return (
    <section className="relative isolate overflow-hidden border-b border-slate-100 py-28 md:py-36 text-white">
      {/* Video latar — ganti nama file sesuai punyamu di /public/videos/ */}
      <video
        className="absolute inset-x-0 top-0 -z-20 h-[420px] w-full object-cover motion-reduce:hidden"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src="/videos/projects-bg.mov" type="video/mp4" />
      </video>
      {/* Lapisan gelap transparan supaya teks putih tetap kebaca */}
      <div className="absolute inset-0 -z-10 bg-slate-950/60" />

      <div className="mx-auto max-w-6xl px-5">
        <p className="text-4xl font-semibold text-center text-sky-100">
          {t.portfolio.titlegrid}
        </p>

        <p className="mt-3 text-center text-sm text-slate-200 md:whitespace-nowrap">
          {t.portfolio.descgrid}
        </p>
      </div>
    </section>
  );
}
