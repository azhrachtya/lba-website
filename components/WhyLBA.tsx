"use client";
import { useLang } from "./LangProvider";

const LETTERS = ["L", "B", "A"] as const;
// Geseran ke kanan tiap baris, membentuk anak tangga menurun
const STEPS = ["lg:ml-0", "lg:ml-10", "lg:ml-20"] as const;

function CardIcon({ i }: { i: number }) {
  const icons = [
    // kapal
    <g key="ship">
      <path d="M12 10.189V14" />
      <path d="M12 2v3" />
      <path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6" />
      <path d="M19.38 20A11.6 11.6 0 0 0 21 14l-8.188-3.639a2 2 0 0 0-1.624 0L3 14a11.6 11.6 0 0 0 2.81 7.76" />
      <path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1s1.2 1 2.5 1c2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
    </g>,
    // pin lokasi
    <g key="pin">
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </g>,
    // perisai
    <path key="shield" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  ];
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-cyan-300" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {icons[i]}
    </svg>
  );
}

export default function WhyLBA() {
  const { t } = useLang();
  const w = t.why;

  return (
    <section className="relative isolate overflow-hidden bg-slate-950 py-16 text-white md:py-20">
      {/* Video latar */}
      <video
        className="absolute left-0 top-0 -z-20 h-[90px] min-h-full w-full object-cover motion-reduce:hidden"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src="/videos/why-bg.mov" type="video/mp4" />
      </video>
      {/* Lapisan gelap supaya teks tetap terbaca */}
      <div className="absolute inset-0 -z-10 bg-slate-950/70" />

      <div className="mx-auto max-w-6xl px-5">
        {/* Judul tengah */}
        <div className="text-center">
          <h2 className="mt-4 font-head text-4xl font-bold text-stone-100 md:text-5xl">{w.tag}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-300 md:text-base">{w.subtitle}</p>
        </div>

        {/* Kiri: 3 baris | Kanan: logo LBA */}
        <div className="mt-12 lg:grid lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
          {/* Tiga baris: [huruf besar + ikon] [teks] */}
          <div className="space-y-8 lg:space-y-10">
            {w.cards.map((c, i) => (
              <div key={c.title} className="grid items-center gap-4 lg:grid-cols-[360px_1fr] lg:gap-8">
                {/* Huruf besar + ikon (hanya di layar lebar) */}
                <div aria-hidden="true" className={`hidden select-none items-center gap-4 lg:flex ${STEPS[i]}`}>
                  <span
                    style={{ fontFamily: "var(--font-libre-baskerville)" }}
                    className="bg-gradient-to-b from-mist to-blue-300 bg-clip-text text-[8rem] font-extrabold leading-[0.85] text-transparent"
                  >
                    {LETTERS[i]}
                  </span>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-cyan-300/50 bg-slate-950/40 backdrop-blur-sm">
                    <CardIcon i={i} />
                  </div>
                </div>

                {/* Teks */}
                <div>
                  {/* Huruf + ikon untuk HP dan tablet portrait */}
                  <div aria-hidden="true" className="mb-3 flex items-center gap-3 lg:hidden">
                    <span
                      style={{ fontFamily: "var(--font-libre-baskerville)" }}
                      className="bg-gradient-to-b from-mist to-blue-300 bg-clip-text text-6xl font-extrabold leading-none text-transparent"
                    >
                      {LETTERS[i]}
                    </span>
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cyan-300/50 bg-slate-950/40">
                      <CardIcon i={i} />
                    </div>
                  </div>

                  <h3 className="font-head text-lg font-bold text-stone-100 md:text-xl">{c.title}</h3>
                  <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm font-medium text-slate-100">
                    {c.bullets.map((b) => (
                      <li key={b}>• {b}</li>
                    ))}
                  </ul>
                  <p className="mt-2 text-xs leading-5 text-slate-300 md:text-sm">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}