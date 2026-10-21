"use client";
import Link from "next/link";
import Img from "./Img";
import { pick } from "@/lib/i18n";
import { useLang } from "./LangProvider";
import { matchSlugFromTitle } from "@/lib/serviceContent";
import Reveal from "./Reveal";

// Warna bentuk blob di belakang gambar, bergantian per kartu


export default function Services({ services }: { services: any[] }) {
  const { t, lang } = useLang();
  return (
    <section id="services" className="mx-auto max-w-6xl px-5 py-16">
      {/* Header: judul + deskripsi */}
      <Reveal>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-brand">{t.services.title}</p>
          <h2 className="mt-2 font-head text-3xl font-bold">{t.services.tag}</h2>
        </div>
        <p className="max-w-xs text-sm text-slate-500">{t.services.sub}</p>
      </div>
      </Reveal>

      <hr className="mt-8 border-t border-slate-200" />

      {/* Kartu layanan: seluruh kartu bisa diklik ke halaman detail */}
      <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => {
          const hasPhoto = Boolean(s.image);
          const slug = matchSlugFromTitle(s.title?.en || pick(s.title, lang));
          const href = slug ? `/services/${slug}` : "#";

          if (hasPhoto) {
            return (
              <Reveal key={i} delay={(i % 3) * 120}>
                <Link href={href} className="group block cursor-pointer text-center">
                  {/* Gambar */}
                  <div className="relative mx-auto aspect-square w-full max-w-[300px]">
                    <Img
                      src={s.image}
                      fallback="/images/service-1.jpeg"
                      className="h-full w-full scale-110 object-contain transition duration-300 group-hover:-translate-y-1 group-hover:scale-[1.15]"
                      w={700}
                    />
                  </div>

                  {/* Teks */}
                  <h3 className="mt-4 font-head text-lg font-bold text-slate-900 group-hover:text-brand">
                    {pick(s.title, lang)}
                  </h3>
                  <p className="mx-auto mt-1.5 max-w-xs text-sm text-slate-500">{pick(s.description, lang)}</p>
                </Link>
              </Reveal>
            );
          }

          // Tanpa foto: kartu teks biasa
          return (
            <Reveal key={i} delay={(i % 3) * 120}>
              <Link
                href={href}
                className="group block cursor-pointer rounded-xl p-5 transition hover:-translate-y-0.5 hover:bg-mist hover:shadow-md"
              >
                <h3 className="font-head text-base font-bold group-hover:text-brand">{pick(s.title, lang)}</h3>
                <p className="mt-1.5 text-sm text-slate-500">{pick(s.description, lang)}</p>
              </Link>
            </Reveal>
          );
        })}
        </div>
    </section>
  );
}