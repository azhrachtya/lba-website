"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { LANGS } from "@/lib/i18n";
import { useLang } from "./LangProvider";

const strip = (p: string) => p.replace(/^\/(en|id|zh)(?=\/|$)/, "") || "/";

export default function LanguageSwitcher({
  onDark = false, // true = dipakai di atas hero (transparan), teks putih
  align = "right", // arah buka dropdown: "right" (desktop navbar) atau "left" (menu HP)
}: {
  onDark?: boolean;
  align?: "left" | "right";
}) {
  const { lang } = useLang();
  const base = strip(usePathname() || "/");
  // Sama seperti pathFor di lib/seo: English tanpa prefix, bahasa lain pakai /id atau /zh
  const PREFIX: Record<string, string> = { en: "", id: "/id", zh: "/zh" };
  const hrefFor = (code: string) => `${PREFIX[code] ?? ""}${base === "/" ? "" : base}` || "/";

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = LANGS.find((l) => l.code === lang) ?? LANGS[0];

  // Tutup dropdown kalau klik di luar atau tekan Esc
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative inline-block text-sm">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Language"
        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-semibold transition-colors duration-300 ${
          onDark
            ? "border-white/50 text-white hover:bg-white/10"
            : "border-slate-300 text-slate-700 hover:border-slate-400 hover:text-slate-900"
        }`}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z" />
        </svg>
        {current.label}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className={`absolute z-50 mt-2 min-w-[6rem] overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          {LANGS.map(({ code, label }) => (
            <li key={code} role="option" aria-selected={lang === code}>
              {/* <a> biasa (bukan <Link>) supaya browser memuat ulang halaman penuh
                  dan middleware ikut jalan saat pindah ke/dari English */}
              <a
                href={hrefFor(code)}
                hrefLang={code}
                onClick={() => setOpen(false)}
                className={`block px-4 py-2 font-semibold transition ${
                  lang === code ? "bg-blue-50 text-blue-600" : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
