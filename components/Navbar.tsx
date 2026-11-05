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
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 lg:h-24">
        <Link href={lp("/")} className="flex min-w-0 items-center gap-3">
          <img
            src="/images/logo.webp"
            alt="LBA"
            className="h-14 w-auto shrink-0 object-contain lg:h-[4.5rem]"
          />
          <span className="min-w-0">
            <span
              className={`block font-head text-sm font-bold leading-tight text-center font-serif transition-colors duration-300 sm:text-base lg:text-lg xl:text-xl ${
                transparent ? "text-white" : "text-slate-900"
              }`}
            >
              PT LAUTAN BERLIAN ABADI
            </span>
            <span
              className={`mt-0.5 block truncate text-[10px] font-medium leading-tight transition-colors duration-300 sm:text-xs lg:text-[13px] ${
                transparent ? "text-white/85" : "text-slate-500"
              }`}
            >
              {t.nav.tagline}
            </span>
          </span>
        </Link>

        <nav className="hidden gap-6 text-[15px] font-medium lg:flex xl:gap-8">
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

        <div className="flex shrink-0 items-center gap-3">
          <div className="hidden lg:block">
            <LanguageSwitcher onDark={transparent} />
          </div>
          <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>
            <span className={`text-3xl transition-colors duration-300 ${transparent ? "text-white" : "text-slate-900"}`}>
              {open ? "×" : "☰"}
            </span>
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-slate-100 bg-white px-5 py-3 lg:hidden">
          {links.map(([k, id]) => (
            <a key={k} href={hrefFor(id)} onClick={() => setOpen(false)} className="py-2 text-base text-slate-700 hover:text-brand">
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