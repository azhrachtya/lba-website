"use client";
import { useState } from "react";
import Link from "next/link";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { useLang } from "./LangProvider";

export default function Portfolio({ projects }: { projects: any[] }) {
  const { t } = useLang();
  const [sel, setSel] = useState<any>(null);
  const top4 = projects.slice(0, 4);

  return (
    <section id="project" className="bg-mist py-20">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-brand">{t.portfolio.tag}</p>
            <h2 className="mt-2 font-head text-3xl font-bold">{t.portfolio.title}</h2>
          </div>
          <Link href="/projects" className="rounded-full border border-slate-900 px-5 py-2 text-xs font-semibold text-slate-900 hover:bg-slate-900 hover:text-white">
            {t.portfolio.viewMore}
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {top4.map((p, i) => (
            <ProjectCard key={i} p={p} onSelect={setSel} />
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link href="/projects" className="inline-block rounded-full border border-slate-900 px-6 py-2.5 text-sm font-semibold text-slate-900">
            {t.portfolio.viewMore}
          </Link>
        </div>
      </div>
      {sel && <ProjectModal p={sel} onClose={() => setSel(null)} />}
    </section>
  );
}
