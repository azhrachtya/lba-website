"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { dict, Lang } from "@/lib/i18n";

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: "en", setLang: () => {} });
export const useLang = () => {
  const { lang, setLang } = useContext(Ctx);
  return { lang, setLang, t: dict[lang] };
};

export default function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setL] = useState<Lang>("en");
  useEffect(() => {
    const s = localStorage.getItem("lba-lang") as Lang | null;
    if (s && dict[s]) setL(s);
  }, []);
  const setLang = (l: Lang) => {
    setL(l);
    localStorage.setItem("lba-lang", l);
    document.documentElement.lang = l;
  };
  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>;
}
