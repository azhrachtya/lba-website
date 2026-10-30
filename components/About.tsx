"use client";
import Img from "./Img";
import { useLang } from "./LangProvider";
import Reveal from "./Reveal";


// Nama perusahaan tidak perlu diterjemahkan, urutannya sama dengan t.about.exp.groups

const svgProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "h-6 w-6",
  "aria-hidden": true,
};

const IconVision = () => (
  <svg {...svgProps}>
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const IconMission = () => (
  <svg {...svgProps}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1.5" />
  </svg>
);
const IconIntegrity = () => (
  <svg {...svgProps}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);
const IconTrust = () => (
  <svg {...svgProps}>
    <path d="m11 17 2 2a1 1 0 1 0 3-3" />
    <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.9-3.9a2 2 0 0 0-2.8 0l-.7.7a1.5 1.5 0 0 1-2.1 0 1.5 1.5 0 0 1 0-2.1L12 5" />
    <path d="m21 3 1 11h-2" />
    <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
    <path d="M3 4h8" />
  </svg>
);
const IconRespect = () => (
  <svg {...svgProps}>
    <path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7 7-7z" />
  </svg>
);

const VALUE_ICONS = [IconIntegrity, IconTrust, IconRespect];

function IconBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/60 text-[#232448]">      {children}
    </span>
  );
}

export default function About({ image }: { image?: any }) {
  const { t } = useLang();
  const a = t.about;

  // "ABOUT US" -> baris 1 "ABOUT", baris 2 "US" (kalau satu kata, tampil utuh)
  const words = a.tag.split(" ");
  const first = words.length > 1 ? words.slice(0, -1).join(" ") : a.tag;
  const last = words.length > 1 ? words[words.length - 1] : "";

  return (
    <section id="about" className="-mt-px bg-mist">
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-12 md:pb-10 md:pt-20">
        
        {/* ATAS: teks kiri + foto & core values kanan */}
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          {/* KIRI */}
          <div  className="md:-translate-y-16">
          <Reveal delay={200} duration={1000}>
            <p className="font-xl font-semibold text-slate-600">{a.title}</p>
            <h2 className="font-head text-5xl font-extrabold uppercase leading-[0.95] md:text-7xl">
              <span className="block text-[#232448]">{first}</span>
              {last && <span className="block text-brand">{last}</span>}
            </h2>
            <div className="mt-6 h-1.5 w-24 rounded-full bg-yellow-300" />
              <div className="mt-16 space-y-5 text-sm font-medium leading-7 text-slate-700 md:text-base md:leading-8">
                {a.body.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </Reveal>
          </div>

          {/* KANAN */}
          <div>
            <Reveal dir="scale" delay={500} duration={1100}>
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl border-[2px] border-brand">
                <Img
                  src={image} w={1400}
                  fallback="/images/about.jpeg"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </Reveal>

            {/* CORE VALUES (kotak di bawah foto) */}
            <Reveal delay={900} duration={900}>
              <div className="mt-5 rounded-xl px-6 py-7">
                <div className="text-center">
                  <h3 className="font-head text-xl font-bold uppercase text-sky-800 md:text-2xl">
                    {a.values.title}
                  </h3>
                  <p className="mt-2 text-xs leading-6 text-slate-600">{a.values.intro}</p>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  {a.values.items.map((name, i) => {
                    const Icon = VALUE_ICONS[i];
                    return (
                      <div
                        key={name}
                        className="flex flex-col items-center rounded-2xl px-2 py-3 text-center transition duration-300 hover:-translate-y-1 hover:bg-white/60 hover:shadow-lg"
                      >
                        <IconBadge>
                          <Icon />
                        </IconBadge>
                        <p className="mt-3 font-head text-base font-bold text-brand-dark md:text-lg">{name}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}