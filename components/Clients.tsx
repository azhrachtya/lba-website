"use client";

import { useState } from 'react';
import { useLang } from './LangProvider';
import { urlFor } from '@/sanity/lib/client';
import { defaultClients } from '@/lib/client-fallbacks';

type Client = { _id?: string; name: string; logo?: any; logoUrl?: string };

function ClientMark({ client, decorative = false }: { client: Client; decorative?: boolean }) {
  const [failed, setFailed] = useState(false);
  const logoUrl = client.logo?.asset ? urlFor(client.logo).width(300).auto('format').url() : client.logoUrl;
  return (
    <figure className="flex h-24 w-36 shrink-0 items-center justify-center px-3 sm:w-44">
      {logoUrl && !failed ? (
        <img src={logoUrl} alt={decorative ? '' : client.name} className="max-h-14 max-w-full object-contain" loading="lazy" onError={() => setFailed(true)} />
      ) : (
        <span className="text-center text-sm font-semibold leading-relaxed text-slate-600">{client.name}</span>
      )}
    </figure>
  );
}

export default function Clients({ clients = [] }: { clients?: Client[] }) {
  const { t } = useLang();
  const list = clients.length ? clients : defaultClients;
  const rows = [list.filter((_, index) => index % 2 === 0), list.filter((_, index) => index % 2 !== 0)];

  return (
    <section id="clients" aria-labelledby="clients-title" className="w-full bg-white py-14 text-center md:py-20">
      <div className="mx-auto max-w-6xl px-5">
        <p className="text-xs font-semibold text-slate-400">{t.clients.tag}</p>
        <h2 id="clients-title" className="mt-3 font-head text-2xl font-bold text-slate-900 md:text-3xl">{t.clients.title}</h2>
      </div>
      <div className="clients-marquee-window relative mt-8 space-y-3 overflow-hidden md:mt-10">
        {rows.filter(row => row.length).map((row, rowIndex) => (
          <div key={rowIndex} className={`clients-marquee flex w-max items-center ${rowIndex === 0 ? 'clients-marquee-left' : 'clients-marquee-right'}`}>
            {[0, 1].map(copy => (
              <div key={copy} className="flex shrink-0 items-center gap-6 pr-6 md:gap-12 md:pr-12" aria-hidden={copy === 1 ? true : undefined}>
                {row.map((client, index) => <ClientMark key={`${client._id || client.name}-${index}`} client={client} decorative={copy === 1} />)}
              </div>
            ))}
          </div>
        ))}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent sm:w-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent sm:w-20" />
      </div>
    </section>
  );
}
