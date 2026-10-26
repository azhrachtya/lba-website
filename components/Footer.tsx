"use client";

import Link from "next/link";
import { useLang } from "./LangProvider";
import { services as staticServices, matchSlugFromTitle } from "@/lib/serviceContent";
import { defaultOffices } from "@/lib/defaults";
import { pick } from "@/lib/i18n";

export default function Footer({ services }: { services?: any[] }) {
  const { t, lang } = useLang();

  // Nama cadangan (dipakai hanya kalau data CMS belum ada)
  const serviceNames: Record<string, string> = {
    "ppjk-customs": t.serviceNames.customs,
    "sea-air-freight": t.serviceNames.seaAir,
    "inland-transportation": t.serviceNames.inland,
    "warehousing": t.serviceNames.warehousing,
    "project-cargo": t.serviceNames.projectCargo,
  };

  // Daftar layanan footer: utamakan dari CMS (sama persis dengan section Services)
  const serviceLinks =
    services && services.length > 0
      ? services.map((s) => {
          const slug = s.pageSlug || matchSlugFromTitle(s.title?.en || pick(s.title, lang));
          return {
            label: pick(s.title, lang),
            href: slug ? `/services/${slug}` : "/#services",
          };
        })
      : staticServices.map((s) => ({
          label: serviceNames[s.slug] ?? s.navTitle,
          href: `/services/${s.slug}`,
        }));

  const socialLinks = [
    {
      name: "Instagram",
      url: "https://www.instagram.com/",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      ),
    },   
  ];

  return (
    <footer className="bg-slate-200 text-black">
      <div className="mx-auto max-w-6xl px-5 py-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* KOLOM 1 — COMPANY */}
          <div>
            <img
              src="/images/logo.png"
              alt="LBA"
              className="h-21 w-21 object-contain"
            />
            <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1.5 text-sm">
              {t.footer.tagline} · {t.footer.est}
            </p>
          </div>

          {/* KOLOM 2 — SERVICES */}
          <div>
            <p className="font-head text-xl font-bold text-black">
              {t.nav.services}
            </p>

            <ul className="mt-3 flex flex-col items-start gap-y-2 text-sm">
              {serviceLinks.map((l, i) => (
                <li key={`${l.href}-${i}`}>
                  <Link href={l.href} className="hover:text-yellow-900">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* KOLOM 3 — CONTACT */}
          <div>
            <p className="font-head text-xl font-bold text-black">
              {t.footer.follow}
            </p>

              <div className="mt-6 grid w-fit grid-cols-3 gap-2">
                {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  title={social.name}
                  className="!flex !h-9 !w-9 !min-h-0 !min-w-0 items-center justify-center rounded-full border border-slate-500/40 bg-white/5 text-black transition hover:border-white hover:bg-white hover:text-navy"                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* KOLOM 4 — LOCATIONS */}
          <div>
            <p className="font-head text-xl font-bold text-black">
              {t.footer.locations}
            </p>

            <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-2 text-sm">
              {defaultOffices.map((o, index) => (
                <li key={o.city.en} className="flex items-center">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(o.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-yellow-900"
                  >
                    {pick(o.city, lang)}
                  </a>

                  {index < defaultOffices.length - 1 && (
                    <span className="ml-3 text-slate-500">|</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* COPYRIGHT */}
        <div className="mt-10 border-t border-black/15 pt-5 text-sm">
          © 2026 PT Lautan Berlian Abadi. {t.footer.rights}
        </div>
      </div>
    </footer>
  );
}