
"use client";
import { useLang } from "./LangProvider";
import { pick, type L3, type Lang } from "@/lib/i18n";
import Img from "./Img";
import Reveal from "./Reveal";

const cityName = (c: string | L3, lang: Lang) =>
  typeof c === "string" ? c : pick(c, lang);

export default function Contact({ offices }: { offices: any[] }) {
  const { t, lang } = useLang();

  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 py-16">
      <Reveal>
        <h2 className="font-head text-2xl font-bold">
          {t.contact.title}
        </h2>
      </Reveal>

      <Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3 md:gap-6">
          {offices.map((o, i) => (
            <div
              key={o._id ?? i}
              className="grid grid-cols-[112px_minmax(0,1fr)] overflow-hidden rounded-xl border border-slate-200 md:block"
            >
              {/* Foto Kantor */}
              {(o.photo?.asset || o.image) && (
                <div className="relative aspect-square w-full overflow-hidden bg-slate-100 md:aspect-[5/5]">
                  <Img
                    src={o.photo}
                    fallback={o.image}
                    alt={cityName(o.city, lang)}
                    className="absolute inset-0 h-full w-full object-cover object-[50%_30%]"
                    w={900}
                    sizes="(min-width: 768px) 380px, 112px"
                  />
                </div>
              )}

              {/* Informasi Kantor */}
              <div className="min-w-0 p-3 md:p-5">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <h3 className="font-head text-base font-bold md:text-lg">
                    {cityName(o.city, lang)}
                  </h3>

                  <span className="text-[9px] font-semibold text-brand md:text-[11px]">
                    {o.type === "head" || i === 0
                      ? t.contact.head
                      : t.contact.branch}
                  </span>
                </div>

                <a
                  href={
                    o.mapsUrl ||
                    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(o.address)}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 block text-xs leading-5 text-slate-500 hover:text-brand hover:underline md:text-sm md:leading-6"
                >
                  {o.address}
                </a>

                <ul className="mt-2 space-y-1 text-xs leading-5 md:mt-3 md:text-sm">
                  {o.phone && (
                    <li>
                      <a href={`tel:${o.phone}`} className="hover:text-brand">
                        {o.phone}
                      </a>
                    </li>
                  )}

                  {o.whatsapp && (
                    <li>
                      <a
                        href={`https://wa.me/${o.whatsapp}`}
                        className="hover:text-brand"
                      >
                        WhatsApp +{o.whatsapp}
                      </a>
                    </li>
                  )}

                  {o.email && (
                    <li className="break-all">
                      <a
                        href={`mailto:${o.email}`}
                        className="hover:text-brand"
                      >
                        {o.email}
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
