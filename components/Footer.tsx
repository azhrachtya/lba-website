"use client";

import Link from "next/link";
import { useLang } from "./LangProvider";
import { services } from "@/lib/serviceContent";
import { defaultOffices } from "@/lib/defaults";
import { pick } from "@/lib/i18n";

export default function Footer() {
  const { t, lang } = useLang();

  const serviceNames: Record<string, string> = {
    "freight-forwarding": t.serviceNames.freight_forwarding,
    "ppjk-customs": t.serviceNames.customs,
    "sea-air-freight": t.serviceNames.seaAir,
    "inland-transportation": t.serviceNames.inland,
    "warehousing": t.serviceNames.warehousing,
    "project-cargo": t.serviceNames.projectCargo,
  };

  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
          <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2ZM8.34 18H5.67V9.42h2.67ZM7 8.25a1.55 1.55 0 1 1 0-3.1 1.55 1.55 0 0 1 0 3.1ZM18.33 18h-2.66v-4.17c0-.99-.02-2.26-1.38-2.26-1.38 0-1.59 1.08-1.59 2.19V18h-2.67V9.42h2.56v1.17h.04a2.81 2.81 0 0 1 2.52-1.39c2.7 0 3.2 1.78 3.2 4.1Z" />
        </svg>
      ),
    },
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
    {
      name: "TikTok",
      url: "https://www.tiktok.com/",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.56v13.67a2.9 2.9 0 1 1-2.9-2.9c.24 0 .48.03.7.09V9.23a6.47 6.47 0 1 0 5.76 6.44V9.99a8.33 8.33 0 0 0 4.88 1.57V8a4.85 4.85 0 0 1-1.11-.31Z" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
          <path d="M13.5 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.8-.1-1.6-.2-2.5-.2-2.5 0-4.2 1.5-4.2 4.3v2.2H7.3V13h2.8v8z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-navy text-slate-400">
      <div className="mx-auto max-w-6xl px-5 py-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* KOLOM 1 — COMPANY */}
          <div>
            <img
              src="/images/logo.png"
              alt="LBA"
              className="h-20 w-20 object-contain"
            />
            <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1.5 text-sm">
              {t.footer.tagline} · {t.footer.est}
            </p>
          </div>

          {/* KOLOM 2 — SERVICES */}
          <div>
            <p className="font-head text-xl font-bold text-white">
              {t.nav.services}
            </p>

            <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-2 text-sm">
              {services.map((s, index) => (
                <li key={s.slug} className="flex items-center">
                  <Link href={`/services/${s.slug}`} className="hover:text-white">
                    {serviceNames[s.slug] ?? s.navTitle}
                  </Link>

                  {index < services.length - 1 && (
                    <span className="ml-3 text-slate-500">|</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* KOLOM 3 — CONTACT */}
          <div>
            <p className="font-head text-xl font-bold text-white">
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
                  className="!flex !h-9 !w-9 !min-h-0 !min-w-0 items-center justify-center rounded-full border border-slate-500/40 bg-white/5 text-white transition hover:border-white hover:bg-white hover:text-navy"                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* KOLOM 4 — LOCATIONS */}
          <div>
            <p className="font-head text-xl font-bold text-white">
              {t.footer.locations}
            </p>

            <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-2 text-sm">
              {defaultOffices.map((o, index) => (
                <li key={o.city.en} className="flex items-center">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(o.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
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
        <div className="mt-10 border-t border-white/15 pt-5 text-sm">
          © PT Lautan Berlian Abadi. {t.footer.rights}
        </div>
      </div>
    </footer>
  );
}