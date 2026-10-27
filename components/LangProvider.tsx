"use client";
import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { dict, Lang } from "@/lib/i18n";

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: "en", setLang: () => {} });
export const useLang = () => {
  const { lang, setLang } = useContext(Ctx);
  return { lang, setLang, t: dict[lang] };
};

// Di server useLayoutEffect memunculkan warning, jadi pakai useEffect di sana
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setL] = useState<Lang>("en");
  const anchor = useRef<{ el: HTMLElement; top: number } | null>(null);

  useEffect(() => {
    const s = localStorage.getItem("lba-lang") as Lang | null;
    if (s && dict[s]) setL(s);
  }, []);

  // Setelah bahasa berganti dan DOM terbarui (sebelum browser menggambar):
  // kembalikan elemen patokan ke jarak yang sama dari atas layar
  useIsoLayoutEffect(() => {
    const a = anchor.current;
    if (!a) return;
    anchor.current = null;
    const delta = a.el.getBoundingClientRect().top - a.top;
    if (delta !== 0) {
      window.scrollBy({ top: delta, behavior: "instant" as ScrollBehavior });
    }
  }, [lang]);

  const setLang = (l: Lang) => {
    if (l === lang) return;

    // Catat section/footer yang sedang terlihat di layar (di bawah navbar)
    const el = document
      .elementFromPoint(window.innerWidth / 2, 160)
      ?.closest("section, footer") as HTMLElement | null;
    anchor.current = el ? { el, top: el.getBoundingClientRect().top } : null;

    setL(l);
    localStorage.setItem("lba-lang", l);
    document.documentElement.lang = l;
  };

  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>;
}