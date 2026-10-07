"use client";
import { useLang } from "./LangProvider";

export default function Contact({ offices }: { offices: any[] }) {
  const { t } = useLang();
  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 pb-20">
      <h2 className="font-head text-2xl font-bold">{t.contact.title}</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {offices.map((o, i) => (
          <div key={i} className="overflow-hidden rounded-xl border border-slate-200">
            {/* Foto kantor — taruh path gambarnya di field "image" tiap kantor di lib/defaults.ts, filenya di /public/images/ */}
            {o.image && (
              <img
                src={o.image}
                alt={o.city}
                className="h-36 w-full object-cover"
                onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
              />
            )}
            <div className="p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-head text-lg font-bold">{o.city}</h3>
                <span className="text-[11px] font-semibold text-brand">{o.type === "head" || i === 0 ? t.contact.head : t.contact.branch}</span>
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(o.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-start gap-1.5 text-sm text-slate-500 hover:text-brand hover:underline"
              >
                <span>{o.address}</span>
              </a>
              <ul className="mt-3 space-y-1 text-sm">
                {o.phone && <li><a href={`tel:${o.phone}`} className="hover:text-brand">{o.phone}</a></li>}
                {o.whatsapp && <li><a href={`https://wa.me/${o.whatsapp}`} className="hover:text-brand">WhatsApp +{o.whatsapp}</a></li>}
                {o.email && <li><a href={`mailto:${o.email}`} className="hover:text-brand">{o.email}</a></li>}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
