"use client";

import Link from "next/link";
import { useLang } from "@/components/LangProvider";

import { notFoundCopy, notFoundLinks } from "@/lib/notFound";

export default function NotFound() {
  const { lang } = useLang();
  const { title, description, home, services } = notFoundCopy[lang];
  const links = notFoundLinks(lang);

  return (
    <main className="grid min-h-screen place-items-center bg-mist px-5 py-16">
      <div className="max-w-lg text-center">
        <p className="font-semibold text-brand-dark">404</p>
        <h1 className="mt-3 font-head text-4xl font-bold text-slate-900">{title}</h1>
        <p className="mt-4 text-slate-600">{description}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href={links.home} className="rounded-full bg-slate-900 px-5 py-3 font-semibold text-white">{home}</Link>
          <Link href={links.services} className="rounded-full border border-slate-300 px-5 py-3 font-semibold text-slate-900">{services}</Link>
        </div>
      </div>
    </main>
  );
}
