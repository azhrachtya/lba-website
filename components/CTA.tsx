"use client";
import Img from "./Img";
import { useLang } from "./LangProvider";

export default function CTA({ image, whatsapp = "6281219769494", phone = "02122442738", email = "info@lba.co.id" }: { image?: any; whatsapp?: string; phone?: string; email?: string }) {
  const { t } = useLang();
  return (
    <section className="mx-auto max-w-6xl px-5 pb-16">
      <div className="relative overflow-hidden rounded-3xl bg-brand-dark">
        <Img src={image} fallback="/images/cta.png" className="absolute inset-0 h-full w-full object-cover opacity-80" w={1800} />
        <div className="relative max-w-md p-10">
          <h2 className="font-head text-3xl font-bold text-white">{t.cta.title}</h2>
          <p className="mt-3 text-sm text-sky-100">{t.cta.sub}</p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold">
            <a href={`https://wa.me/${whatsapp}`} className="rounded-full bg-emerald-500 px-5 py-2.5 text-white">{t.cta.wa}</a>
            <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="rounded-full bg-white px-5 py-2.5 text-brand-dark">{t.cta.call}</a>
            <a href={`mailto:${email}`} className="rounded-full bg-blue-200 px-5 py-2.5 text-rose-400">{t.cta.email}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
