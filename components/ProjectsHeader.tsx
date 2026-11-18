"use client";

import Link from "next/link";
import { useLang } from "./LangProvider";
import LazyBgVideo from "./LazyBgVideo";

export default function ProjectsHeader() {
  const { t, lp } = useLang();

  return (
    <section className="relative isolate flex min-h-[32.5rem] items-center justify-center overflow-hidden pb-16 pt-32 text-white md:min-h-[35rem] md:pb-20 md:pt-36">
      <LazyBgVideo
        className="absolute inset-0 -z-20 h-full w-full object-cover motion-reduce:hidden"
        webm="/videos/projects-bg.webm"
        poster="/images/project-bg.webp"
      />
      {/* Lapisan gelap transparan supaya teks putih tetap kebaca */}
      <div className="absolute inset-0 -z-10 bg-slate-950/60" />

      <div className="mx-auto w-full max-w-6xl px-5 text-center">
        <h1 className="text-4xl font-semibold uppercase text-sky-100">
          {t.portfolio.titlegrid}
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-sm text-slate-200">
          {t.portfolio.descgrid}
        </p>

        {/* Breadcrumb */}
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