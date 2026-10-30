"use client";

import Link from "next/link";
import { useLang } from "./LangProvider";

export default function ProjectsHeader() {
  const { t, lp } = useLang();

  return (
    <section className="relative isolate overflow-hidden py-28 text-white md:py-36">
      {/* Video latar — ganti nama file sesuai punyamu di /public/videos/ */}
      <video
        className="absolute inset-0 -z-20 h-full w-full object-cover motion-reduce:hidden"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src="/videos/projects-bg.webm" type="video/webm" />
      </video>
      {/* Lapisan gelap transparan supaya teks putih tetap kebaca */}
      <div className="absolute inset-0 -z-10 bg-slate-950/60" />

      <div className="mx-auto max-w-6xl px-5">
        <h1 className="text-center text-4xl font-semibold uppercase text-sky-100">
          {t.portfolio.titlegrid}
        </h1>

        <p className="mt-3 text-center text-sm text-slate-200 md:whitespace-nowrap">
          {t.portfolio.descgrid}
        </p>

        {/* Breadcrumb — di bawah judul, sama seperti halaman service */}
        <nav aria-label="Breadcrumb" className="mt-8 flex justify-center">
          <ol className="inline-flex flex-wrap items-center justify-center gap-1.5 px-4 py-2 text-xs text-white/80 [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">
            <li>
              <Link href={lp("/")} className="transition hover:text-white">{t.nav.home}</Link>
            </li>
            <li aria-hidden="true" className="text-white/40">›</li>
            <li aria-current="page" className="font-semibold text-white">{t.nav.project}</li>
          </ol>
        </nav>
      </div>
    </section>
  );
}
