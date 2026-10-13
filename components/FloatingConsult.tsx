"use client";

import { useEffect, useRef, useState } from "react";
import { dict } from "@/lib/i18n";
import { useLang } from "./LangProvider";

const WHATSAPP_NUMBER = "6281219769494";
const EMAIL = "azhrachtya@gmail.com";

const SERVICE_KEYS = [
  "freight_forwarding",
  "customs",
  "seaAir",
  "inland",
  "warehousing",
  "projectCargo",
] as const;

export default function FloatingConsult() {
  const { lang } = useLang();
  const t = dict[lang];

  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [topic, setTopic] = useState<string>("general");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const topics = [
    { key: "general", label: t.consult.general },
    ...SERVICE_KEYS.map((k) => ({ key: k, label: t.serviceNames[k] })),
  ];
  const currentLabel = topics.find((x) => x.key === topic)?.label ?? t.consult.general;

  // Tutup dengan Esc + kunci scroll saat popup terbuka
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (dropdown) setDropdown(false);
        else setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, dropdown]);

  // Tutup dropdown kalau klik di luar
  useEffect(() => {
    if (!dropdown) return;
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [dropdown]);

  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `${t.consult.waGreeting} ${currentLabel}`
  )}`;
  const mailHref = `mailto:${EMAIL}?subject=${encodeURIComponent(
    `${t.consult.emailSubject}: ${currentLabel}`
  )}&body=${encodeURIComponent(`${t.consult.emailGreeting} ${currentLabel}\n\n`)}`;

  return (
    <>
      {/* Tombol mengambang */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t.consult.button}
        className="fixed bottom-10 right-10 z-50 flex h-14 items-center gap-2 rounded-full bg-blue-500 px-5 text-white shadow-lg transition hover:bg-navy-deep"      >
        <span className="absolute inset-0 animate-ping rounded-full bg-blue-400 opacity-40" />
        <svg viewBox="0 0 24 24" className="relative h-6 w-6 fill-none stroke-white" strokeWidth="2" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a8 8 0 01-11.6 7.1L4 20l1-4.6A8 8 0 1121 12z" />
        </svg>
        <span className="relative text-sm font-semibold">{t.consult.button}</span>
      </button>

      {/* Overlay + popup */}
      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="consult-title"
        >
          <div
            className="relative w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t.consult.close}
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:bg-slate-100"
            >
              ✕
            </button>

            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-blue-900" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a8 8 0 01-11.6 7.1L4 20l1-4.6A8 8 0 1121 12z" />
              </svg>
            </div>

            <h2 id="consult-title" className="text-2xl font-bold text-slate-900">
              {t.consult.title}
            </h2>
            <p className="mt-2 text-sm text-slate-500">{t.consult.sub}</p>

            {/* Dropdown topik */}
            <label className="mt-6 block text-sm font-semibold text-slate-900">
              {t.consult.topicLabel}
            </label>
            <div className="relative mt-2" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdown((v) => !v)}
                aria-haspopup="listbox"
                aria-expanded={dropdown}
                className="flex w-full items-center justify-between rounded-xl border border-slate-300 bg-white px-4 py-3 text-left text-slate-900"
              >
                <span>{currentLabel}</span>
                <span className={`transition ${dropdown ? "rotate-180" : ""}`}>⌄</span>
              </button>

              {dropdown && (
                <ul
                  role="listbox"
                  className="absolute left-0 right-0 top-full z-10 mt-2 max-h-60 overflow-auto rounded-xl border border-slate-200 bg-white p-2 shadow-xl"
                >
                  {topics.map((x) => (
                    <li key={x.key}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={topic === x.key}
                        onClick={() => {
                          setTopic(x.key);
                          setDropdown(false);
                        }}
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm hover:bg-slate-100 ${
                          topic === x.key ? "bg-slate-100 font-medium" : ""
                        }`}
                      >
                        {x.label}
                        {topic === x.key && <span>✓</span>}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Tombol aksi */}
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-3.5 font-semibold text-white transition hover:bg-blue-800"
            >
              {t.consult.wa} 
            </a>
            <a
              href={mailHref}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3.5 font-semibold text-slate-900 transition hover:bg-slate-50"
            >
              {t.consult.email}
            </a>

            <p className="mt-5 text-xs text-slate-500">{t.consult.note}</p>
          </div>
        </div>
      )}
    </>
  );
}