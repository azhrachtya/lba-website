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
        <div className="relative flex flex-wrap items-center gap-2 pr-28 text-xs font-semibold md:pr-44">
          {["All", ...CATS].map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full border px-4 py-1.5 ${cat === c ? "border-slate-900 bg-slate-900 text-white" : "border-slate-300 bg-white"}`}
            >
              {c === "All" ? t.portfolio.all : t.categories[c as keyof typeof t.categories]}
            </button>
          ))}

          {/* Logo: absolute, tidak menambah tinggi baris tombol */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo.png"
            alt="Logo PT Lautan Berlian Abadi"
            className="pointer-events-none absolute right-0 top-1/2 h-16 w-auto -translate-y-1/2 object-contain md:h-20"
          />
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