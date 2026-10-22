"use client";
import { useState } from "react";
import Link from "next/link";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { useLang } from "./LangProvider";
import Reveal from "./Reveal";

export default function Portfolio({ projects }: { projects: any[] }) {
  const { t } = useLang();
  const [sel, setSel] = useState<any>(null);
  const top4 = projects.slice(0, 4);

  return (
    <section id="project" className= "overflow-x-clip bg-mist py-20">
      <div className="mx-auto max-w-6xl px-2 py-5"> 
        <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="mt-2 font-head text-3xl font-bold text-blue-900">{t.portfolio.title}</h2>
          </div>
          <Link href="/projects" className="hidden rounded-full border border-slate-900 px-5 py-2 text-xs font-semibold text-slate-900 hover:bg-slate-900 hover:text-white md:inline-block">
            {t.portfolio.viewMore}
          </Link>
        </div>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {top4.map((p, i) => (
            <Reveal key={i} delay={(i % 2) * 120}>
              <ProjectCard p={p} onSelect={setSel} />
            </Reveal>
          ))}
        </div>

      <Reveal>    
        <div className="mt-8 text-center md:hidden">
          <Link href="/projects" className="inline-block rounded-full border border-slate-900 px-6 py-2.5 text-sm font-semibold text-slate-900  hover:bg-slate-900 hover:text-white">
            {t.portfolio.viewMore}
          </Link>
        </div>
      </Reveal> 
      </div>
      {sel && <ProjectModal p={sel} onClose={() => setSel(null)} />}
    </section>
  );
}
