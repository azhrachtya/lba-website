"use client";
import { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { useLang } from "./LangProvider";

const CATS = ["Breakbulk", "Heavylift", "Inland", "Warehousing", "Project_cargo"] as const;

// "Project Cargo", "Project_cargo", "project cargo" dianggap sama
const norm = (s?: string) => (s ?? "").toLowerCase().replace(/[\s_]+/g, "");

export default function ProjectsGrid({ projects }: { projects: any[] }) {
  const { t } = useLang();
  const [cat, setCat] = useState<string>("All");
  const [sel, setSel] = useState<any>(null);

  // category seharusnya string biasa, tapi kalau ada sisa data lama berbentuk {en,id,zh}, tetap bisa difilter
  const catKey = (p: any) => (typeof p.category === "string" ? p.category : p.category?.en);
  const list = cat === "All" ? projects : projects.filter((p) => norm(catKey(p)) === norm(cat));

  return (
    <section className="mx-auto max-w-6xl px-5 py-14">
      <div className="sticky top-16 z-20 flex flex-wrap gap-2 bg-white py-3 text-xs font-semibold">
        {["All", ...CATS].map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`rounded-full border px-4 py-1.5 ${cat === c ? "border-slate-900 bg-slate-900 text-white" : "border-slate-300 bg-white"}`}
          >
            {c === "All" ? t.portfolio.all : t.categories[c as keyof typeof t.categories]}
          </button>
        ))}
        <span className="ml-auto self-center text-slate-400">
          {list.length} {list.length === 1 ? t.portfolio.countOne : t.portfolio.count}
        </span>
      </div>

      {list.length === 0 ? (
        <p className="mt-10 text-sm text-slate-400">{t.portfolio.empty}</p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <ProjectCard key={i} p={p} onSelect={setSel} />
          ))}
        </div>
      )}

      {sel && <ProjectModal p={sel} onClose={() => setSel(null)} />}
    </section>
  );
}