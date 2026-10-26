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
  // 1) Sebelum ganti bahasa: catat section mana yang sedang terlihat,
  //    dan berapa jauh jaraknya dari atas layar
  const ids = ["home", "about", "services", "project", "coverage", "contact"];
  const current = ids
    .map((id) => document.getElementById(id))
    .find((el) => el && el.getBoundingClientRect().bottom > 120) as HTMLElement | undefined;
  const before = current ? current.getBoundingClientRect().top : 0;

  // 2) Ganti bahasa seperti biasa
  setL(l);
  localStorage.setItem("lba-lang", l);
  document.documentElement.lang = l;

  // 3) Setelah halaman selesai render ulang, kembalikan posisi section tadi
  //    ke jarak yang sama dari atas layar
  if (current) {
    const restore = () => {
      const after = current.getBoundingClientRect().top;
      window.scrollBy({ top: after - before });
    };
    requestAnimationFrame(() => requestAnimationFrame(restore));
    setTimeout(restore, 400); // koreksi lagi kalau terjemahan otomatis baru selesai dimuat
  }
};
  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>;
}
