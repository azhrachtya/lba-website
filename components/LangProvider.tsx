"use client";
import { createContext, useContext } from "react";
import { dict, Lang } from "@/lib/i18n";

type Ctx = { lang: Lang; lp: (path: string) => string };
const LangCtx = createContext<Ctx>({ lang: "en", lp: (p) => p });

export const useLang = () => {
  const { lang, lp } = useContext(LangCtx);
  return { lang, lp, t: dict[lang] };
};

export default function LangProvider({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  // lp("/projects") -> en: "/projects", id: "/id/projects"; lp("/#services") -> "/id#services"
  const lp = (path: string) => {
    if (lang === "en") return path || "/";
    if (path === "/" || path === "") return `/${lang}`;
    if (path.startsWith("/#")) return `/${lang}${path.slice(1)}`;
    return `/${lang}${path}`;
  };
  return <LangCtx.Provider value={{ lang, lp }}>{children}</LangCtx.Provider>;
}