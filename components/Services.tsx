"use client";
import Link from "next/link";
import Img from "./Img";
import { pick } from "@/lib/i18n";
import { useLang } from "./LangProvider";
import { matchSlugFromTitle } from "@/lib/serviceContent";

export default function Services({ services }: { services: any[] }) {
  const { t, lang } = useLang();
  return (
    <section id="services" className="mx-auto max-w-6xl px-5 py-16">
      {/* Header: judul + deskripsi */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-brand">{t.services.tag}</p>
          <h2 className="mt-2 font-head text-3xl font-bold">{t.services.title}</h2>
        </div>
        <p className="max-w-xs text-sm text-slate-500">{t.services.sub}</p>
      </div>

      <hr className="mt-8 border-t border-slate-200" />

      {/* Kartu layanan — seluruh kartu bisa diklik, lompat ke halaman detailnya */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => {
          const hasPhoto = Boolean(s.image);
          const slug = matchSlugFromTitle(s.title?.en || pick(s.title, lang));
          const href = slug ? `/services/${slug}` : "#";

          if (hasPhoto) {
            return (
              <Link
                key={i}
                href={href}
                className="group relative block h-56 cursor-pointer overflow-hidden rounded-xl transition hover:shadow-lg"
              >
                <Img
                  src={s.image}
                  fallback="/images/service-1.jpg"
                  className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  w={700}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 p-5 text-white">
                  <h3 className="font-head font-bold text-white">{pick(s.title, lang)}</h3>
                  <p className="mt-1.5 text-xs text-slate-200">{pick(s.description, lang)}</p>
                </div>
              </Link>
            );
          }

          return (
            <Link
              key={i}
              href={href}
              className="group block cursor-pointer rounded-xl p-5 transition hover:-translate-y-0.5 hover:bg-mist hover:shadow-md"
            >
              <h3 className="font-head text-base font-bold group-hover:text-brand">{pick(s.title, lang)}</h3>
              <p className="mt-1.5 text-sm text-slate-500">{pick(s.description, lang)}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
