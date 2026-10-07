"use client";

import Img from "./Img";
import { useLang } from "./LangProvider";

export default function Clients({ clients }: { clients: any[] }) {
  const { t } = useLang();

  if (!clients.length) return null;

  // Bagi logo menjadi 2 baris
  const row1 = clients.filter((_, i) => i % 2 === 0);
  const row2 = clients.filter((_, i) => i % 2 !== 0);

  // Gandakan supaya marquee tidak putus
  const marqueeRow1 = [...row1, ...row1];
  const marqueeRow2 = [...row2, ...row2];

  return (
    <section className="w-full overflow-hidden py-20 text-center">

      {/* Judul */}
      <div className="mx-auto max-w-6xl px-5">
        <p className="text-xs font-semibold text-slate-400">
          {t.clients.tag}
        </p>

        <h2 className="mt-2 font-head text-2xl font-bold">
          {t.clients.title}
        </h2>
      </div>

      {/* LOGO MARQUEE */}
      <div className="relative mt-12 w-full overflow-hidden">

        {/* Fade kiri */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-white to-transparent" />

        {/* BARIS 1 */}
        <div className="clients-marquee clients-marquee-left flex w-max items-center gap-12">
          {marqueeRow1.map((c, index) => (
            <figure
              key={`row1-${c._id}-${index}`}
              className="flex h-24 w-44 shrink-0 items-center justify-center"
            >
              <Img
                src={c.logo}
                alt={c.name}
                className="max-h-14 max-w-[150px] object-contain"
                w={300}
              />
            </figure>
          ))}
        </div>

        {/* Jarak antar baris */}
        <div className="h-4" />

        {/* BARIS 2 */}
        <div className="clients-marquee clients-marquee-right flex w-max items-center gap-12">
          {marqueeRow2.map((c, index) => (
            <figure
              key={`row2-${c._id}-${index}`}
              className="flex h-24 w-44 shrink-0 items-center justify-center"
            >
              <Img
                src={c.logo}
                alt={c.name}
                className="max-h-14 max-w-[150px] object-contain"
                w={300}
              />
            </figure>
          ))}
        </div>

        {/* Fade kanan */}
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-white to-transparent" />

      </div>
    </section>
  );
}