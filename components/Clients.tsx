"use client";
import Img from "./Img";
import { useLang } from "./LangProvider";

export default function Clients({ clients }: { clients: any[] }) {
  const { t } = useLang();
  if (!clients.length) return null;
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 text-center">
      <p className="text-xs font-semibold text-slate-400">{t.clients.tag}</p>
      <h2 className="mt-2 font-head text-2xl font-bold">{t.clients.title}</h2>

      {/* Grid 2 kolom di HP, 3 di tablet, 5 di desktop (sesuai Figma: 5-6 per baris) */}
      <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 md:grid-cols-5">
        {clients.map((c) => (
          <figure
            key={c._id}
            className="group flex cursor-pointer flex-col items-center gap-3 rounded-xl p-4 transition hover:-translate-y-1 hover:bg-slate-50 hover:shadow-md"
          >
            <Img
              src={c.logo}
              alt={c.name}
              className="h-12 w-auto max-w-full object-contain"
              w={300}
            />
            <figcaption className="text-[11px] font-semibold text-slate-600">{c.name}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
