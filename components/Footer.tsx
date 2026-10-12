"use client";
import Link from "next/link";
import { useLang } from "./LangProvider";
import { services } from "@/lib/serviceContent";
import { defaultOffices } from "@/lib/defaults";

export default function Footer() {
  const { t } = useLang();

  const serviceNames: Record<string, string> = {
  "freight-forwarding": t.serviceNames.freight_forwarding,
  "ppjk-customs": t.serviceNames.customs,
  "sea-air-freight": t.serviceNames.seaAir,
  "inland-transportation": t.serviceNames.inland,
  "warehousing": t.serviceNames.warehousing,
  "project-cargo": t.serviceNames.projectCargo,
};


  return (
    <footer className="bg-black text-slate-400">
    <div className="mx-auto max-w-6xl px-5 py-10">

    <div className="grid gap-8 md:grid-cols-3">

      {/* KOLOM 1 — COMPANY */}
      <div>
        <p className="font-head font-bold text-white">
          PT LAUTAN BERLIAN ABADI
        </p>

        <p className="mt-7 text-sm">
          {t.footer.tagline} · <br /> {t.footer.est}
        </p>
      </div>


      {/* KOLOM 2 — SERVICES */}
      <div>
        <p className="font-head font-bold text-white">
          {t.nav.services}
        </p>

        <div className="text-center">
        <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1.5 text-sm">
          {services.map((s, index) => (
            <li key={s.slug} className="flex items-center">
              <Link
                href={`/services/${s.slug}`}
                className="hover:text-white hover:underline"
              >
              {serviceNames[s.slug] ?? s.navTitle}              
              </Link>

              {index < services.length - 1 && (
                <span className="ml-3 text-slate-500">|</span>
              )}
            </li>
          ))}
        </ul>
        </div>
      </div>


      {/* KOLOM 3 — LOCATIONS */}
      <div>
        <p className="font-head font-bold text-white">
          {t.footer.locations}
        </p>
        <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1.5 text-sm">
          {defaultOffices.map((o, index) => (
            <li key={o.city} className="flex items-center">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(o.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white hover:underline"
              >
                {o.city}
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
    <div className="mt-8 border-t border-white/10 pt-5 text-sm">
     © PT Lautan Berlian Abadi. {t.footer.rights}
    </div>

    </div>
    </footer>
  );
}