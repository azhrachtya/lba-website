"use client";
import { LANGS } from "@/lib/i18n";
import { useLang } from "./LangProvider";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang();
  return (
    <div className="flex rounded-full border border-slate-200 bg-white p-0.5 text-xs font-semibold">
      {LANGS.map((l) => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          aria-pressed={lang === l.code}
          className={`rounded-full px-3 py-1 transition ${lang === l.code ? "bg-brand text-white" : "text-slate-500 hover:text-brand"}`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
