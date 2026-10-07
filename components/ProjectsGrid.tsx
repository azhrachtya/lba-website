"use client";
import { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { useLang } from "./LangProvider";

const CATS = ["Breakbulk", "Heavylift", "Inland", "Warehousing", "Project Cargo"];

  export default function ProjectsGrid({ projects }: { projects: any[] }) {
  const { t } = useLang();
  const [cat, setCat] = useState("All");
  const [sel, setSel] = useState<any>(null);
  // Pengaman yang sama kayak di ProjectCard: category seharusnya string biasa,
  // tapi kalau ada sisa data lama berbentuk objek {en,id,zh}, tetap bisa difilter.
  const catKey = (p: any) => (typeof p.category === "string" ? p.category : p.category?.en);
  const list = cat === "All" ? projects : projects.filter((p) => catKey(p) === cat);

  return (
    <section className="mx-auto max-w-6xl px-5 py-14">
      {/* Filter kategori — sekarang di halaman ini, bukan di Home */}
      <div className="sticky top-16 z-20 flex flex-wrap gap-2 bg-white py-3 text-xs font-semibold">
        {["All", ...CATS].map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`rounded-full border px-4 py-1.5 ${cat === c ? "border-slate-900 bg-slate-900 text-white" : "border-slate-300 bg-white"}`}
          >
            {c === "All" ? t.portfolio.all : c}
          </button>
        ))}
        <span className="ml-auto self-center text-slate-400">{list.length} project{list.length !== 1 ? "s" : ""}</span>
      </div>

      {list.length === 0 ? (
        <p className="mt-10 text-sm text-slate-400">No projects in this category yet.</p>
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
