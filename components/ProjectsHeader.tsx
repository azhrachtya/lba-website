
"use client";

import { useLang } from "./LangProvider";

export default function ProjectsHeader() {
  const { t } = useLang();

  return (
    <section className="border-b border-slate-100 bg-mist py-14">
      <div className="mx-auto max-w-6xl px-5">
        <p className="text-xs font-semibold text-brand">
          {t.portfolio.titlegrid}
        </p>

        <h1 className="mt-2 font-head text-4xl font-bold">
          {t.portfolio.subgrid}
        </h1>

        <p className="mt-3 max-w-lg text-sm text-slate-500">
          {t.portfolio.descgrid}
        </p>
      </div>
    </section>
  );
}
