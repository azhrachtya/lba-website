"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useLang } from "./LangProvider";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const { t, lp } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Buang prefix bahasa (/en, /id, /zh) dan trailing slash supaya semua bahasa dihitung sama
  const rawPath = usePathname() || "/";
  const path = rawPath.replace(/^\/(en|id|zh)(?=\/|$)/, "").replace(/\/+$/, "") || "/";
  const isHome = path === "/";
  // Halaman yang diawali hero gelap: Home, detail service, dan Projects
  const hasHero = isHome || path === "/projects" || path.startsWith("/services/");

  // Transparan + teks putih hanya saat di hero, belum di-scroll, dan menu HP tertutup
  const transparent = hasHero && !scrolled && !open;

  const links = [["home", "home"], ["about", "about"], ["services", "services"], ["project", "project"], ["coverage", "coverage"], ["contact", "contact"]] as const;

  // Di Home: anchor biasa (#home). Di halaman lain: balik ke Home bahasa yang sama dulu, lalu scroll.
  const hrefFor = (id: string) => (isHome ? `#${id}` : `${lp("/")}#${id}`);

  return (
    <header
      className={`${hasHero ? "fixed left-0 right-0 top-0" : "sticky top-0"} z-40 border-b transition-all duration-300 ${
        transparent
          ? "border-transparent bg-transparent"
          : "border-slate-100 bg-white/95 shadow-sm backdrop-blur"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href={lp("/")} className="flex items-center gap-2">
          <img src="/images/logo.webp" alt="LBA" className="h-20 w-20 object-contain" />
          <span className={`font-head text-base font-bold leading-tight transition-colors duration-300 ${transparent ? "text-white" : "text-slate-900"}`}>
            PT LAUTAN BERLIAN ABADI
          </span>
        </Link>

        <nav className="hidden gap-7 text-sm md:flex">
          {links.map(([k, id]) => (
            <a
              key={k}
              href={hrefFor(id)}
              className={`transition-colors duration-300 ${transparent ? "text-white hover:text-sky-300" : "text-slate-600 hover:text-brand"}`}
            >
              {t.nav[k]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <LanguageSwitcher onDark={transparent} />
          </div>
          <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>
            <span className={`text-2xl transition-colors duration-300 ${transparent ? "text-white" : "text-slate-900"}`}>
              {open ? "×" : "☰"}
            </span>
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-slate-100 bg-white px-5 py-3 md:hidden">
          {links.map(([k, id]) => (
            <a key={k} href={hrefFor(id)} onClick={() => setOpen(false)} className="py-2 text-slate-700 hover:text-brand">
              {t.nav[k]}
            </a>
          ))}
          <div className="mt-2 border-t border-slate-100 pt-3">
            <LanguageSwitcher align="left" />
          </div>
        </nav>
      )}
    </header>
  );
}
