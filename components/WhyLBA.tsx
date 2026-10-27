"use client";
import { useEffect, useRef, useState } from "react";
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
    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-blue-200" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {icons[i]}
    </svg>
  );
}

// Menandai true saat elemen masuk layar (sekali saja)
function useInView<T extends HTMLElement>(threshold = 0.2, rootMargin = "0px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);

  return { ref, inView };
}

export default function WhyLBA() {
  const { t } = useLang();
  const w = t.why;
  const { ref, inView } = useInView<HTMLDivElement>(0.15, "0px 0px -12% 0px");

  // Kelas dasar animasi (dimatikan kalau pengguna pilih reduce motion)
  const base = "transition-all ease-out motion-reduce:transform-none motion-reduce:transition-none";
  const fadeUp = `${base} duration-700 ${inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`;
  const fromLeft = `${base} duration-1000 ${inView ? "translate-x-0 opacity-100" : "-translate-x-24 opacity-0"}`;
  const pop = `${base} duration-700 ${inView ? "scale-100 opacity-100" : "scale-50 opacity-0"}`;

  return (
    <section className="relative isolate -mt-px overflow-hidden bg-mist pb-16 pt-52 text-white md:pb-20 md:pt-72">

      {/* Foto latar */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/why.webp"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />

      {/* Satu lapisan saja: mist di atas memudar pelan, lalu lapisan gelap tetap di bawahnya. Tidak ada sambungan = tidak ada garis */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to bottom, #eff4fb 0px, rgba(239,244,251,0.97) 40px, rgba(239,244,251,0.88) 90px, rgba(239,244,251,0.72) 140px, rgba(239,244,251,0.52) 190px, rgba(239,244,251,0.32) 240px, rgba(239,244,251,0.14) 290px, rgba(239,244,251,0) 340px), linear-gradient(rgba(2,6,23,0.72), rgba(2,6,23,0.72))",
        }}
      />

      <div ref={ref} className="mx-auto max-w-6xl px-5 md:px-12 xl:px-5">
        {/* Judul tengah */}
        <div className="relative -top-4 -mt-6 text-center md:-top-6 md:-mt-10">
          <h2 className={`mt-4 font-head text-4xl font-bold text-stone-100 md:text-5xl ${fadeUp}`}>{w.tag}</h2>
          <p
            style={{ transitionDelay: "150ms" }}
            className={`mx-auto mt-3 max-w-2xl text-sm text-slate-300 md:text-base ${fadeUp}`}
          >
            {w.subtitle}
          </p>
        </div>

        {/* Tiga baris: [huruf besar + ikon] [teks] */}
        <div className="mt-16 space-y-8 md:mt-20 lg:space-y-10">
          {w.cards.map((c, i) => (
            <div key={c.title} className="grid items-center gap-4 lg:grid-cols-[360px_1fr] lg:gap-8">
              {/* Huruf besar + ikon (hanya di layar lebar) */}
              <div
                aria-hidden="true"
                style={{ transitionDelay: `${300 + i * 250}ms` }}
                className={`hidden select-none items-center gap-4 lg:flex ${STEPS[i]} ${fromLeft}`}
              >
                <span
                  style={{ fontFamily: "var(--font-libre-baskerville)" }}
                  className="bg-gradient-to-b from-mist to-blue-300 bg-clip-text text-[8rem] font-extrabold leading-[0.85] text-transparent"
                >
                  {LETTERS[i]}
                </span>
                <div
                  style={{ transitionDelay: `${700 + i * 250}ms` }}
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-blue-700/50 bg-slate-950/40 backdrop-blur-sm ${pop}`}
                >
                  <CardIcon i={i} />
                </div>
              </div>

              {/* Teks */}
              <div>
                {/* Huruf + ikon untuk HP dan tablet portrait */}
                <div
                  aria-hidden="true"
                  style={{ transitionDelay: `${300 + i * 250}ms` }}
                  className={`mb-3 flex items-center gap-3 lg:hidden ${fromLeft}`}
                >
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

                <div style={{ transitionDelay: `${500 + i * 250}ms` }} className={fadeUp}>
                  <h3 className="font-head text-lg font-bold text-stone-100 md:text-xl">{c.title}</h3>

                  <p className="mt-2 text-sm leading-5 text-slate-300 md:text-sm">{c.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}