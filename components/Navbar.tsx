"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useLang } from "./LangProvider";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 50);
  };

  handleScroll();
  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const links = [["home", "home"], ["about", "about"], ["services", "services"], ["project", "project"], ["coverage", "coverage"], ["contact", "contact"]] as const;

  // Di halaman Home, link anchor biasa (#home) cukup buat scroll halus.
  // Di halaman lain (misal /services/xxx), perlu diarahin balik ke Home dulu baru scroll ("/#home").
  const hrefFor = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  return (
<header
      className={`${
        isHome
          ? "fixed left-0 right-0 top-0"
          : "sticky top-0"
      } z-40 border-b transition-all duration-300 ${
        isHome && !scrolled
          ? "border-transparent bg-transparent"
          : "border-slate-100 bg-white/95 shadow-sm backdrop-blur"
      }`}
    >   
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2">
          <img src="/images/logo.png" alt="LBA" className="h-8 w-8 object-contain" />
          <span className="font-head text-sm font-bold leading-tight text-slate-900">PT LAUTAN BERLIAN ABADI</span>
        </Link>
        <nav className="hidden gap-7 text-sm md:flex">
          {links.map(([k, id]) => (
            <a key={k} href={hrefFor(id)} className="text-slate-600 hover:text-brand">{t.nav[k]}</a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>
            <span className="text-2xl">{open ? "×" : "☰"}</span>
          </button>
        </div>
      </div>
      {open && (
        <nav className="flex flex-col gap-1 border-t border-slate-100 bg-white px-5 py-3 md:hidden">
          {links.map(([k, id]) => (
            <a key={k} href={hrefFor(id)} onClick={() => setOpen(false)} className="py-2 text-slate-700">{t.nav[k]}</a>
          ))}
        </nav>
      )}
    </header>
  );
}
