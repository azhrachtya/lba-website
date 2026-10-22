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
    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-[#5468bc]">
      {children}
    </span>
  );
}

export default function About({ image, image2, image3 }: { image?: any; image2?: any; image3?: any }) {  const { t } = useLang();
  const a = t.about;

      return (
    <section id="about" className="-mt-px bg-mist">
      {/* ATAS: judul + 3 foto */}
      <div className="relative z-10 mx-auto max-w-6xl px-5 pt-12 md:pt-16">
        <Reveal>
          <div className="text-center">
            <h2 className="font-head text-3xl font-bold uppercase leading-none text-brand md:text-4xl">
              {a.tag}
            </h2>
            <p className="mt-4 text-xs font-semibold tracking-wide text-slate-700 md:text-sm">{a.title}</p>
          </div>
        </Reveal>

        {/* items-end: kiri-kanan sejajar bawah (tenggelam), tengah lebih tinggi */}
        <div className="mt-10 flex items-end justify-center gap-3 md:mt-14 md:gap-8">
          {/* Kiri */}
          <Reveal>
            <Img
              src={image}
              fallback="/images/about.jpeg"
              className="h-28 w-40 rounded-[1.75rem] object-cover shadow-md md:h-40 md:w-60 md:rounded-[2.25rem]"
            />
          </Reveal>

          {/* Tengah: lebih atas, tidak ada translate */}
          <Reveal delay={150} dir="scale">
            <Img
              src={image2 || image}
              fallback="/images/about.jpeg"
              className="h-44 w-28 rounded-[2rem] object-cover shadow-md md:h-64 md:w-44 md:translate-y-12 md:rounded-[2.5rem]"
            />
          </Reveal>

          {/* Kanan */}
          <Reveal delay={300}>
            <Img
              src={image3 || image}
              fallback="/images/about.jpeg"
              className="h-28 w-40 rounded-[1.75rem] object-cover shadow-md md:h-40 md:w-60 md:rounded-[2.25rem]"
            />
          </Reveal>
        </div>
      </div>

      {/* BIRU: gelombang + semua konten sampai akhir section */}
      <div className="relative z-0 -mt-16 md:-mt-32">
        <svg
          className="block h-20 w-full text-[#5468bc] md:h-40"
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M0,70 C200,0 400,30 560,70 C700,105 800,110 940,85 C1100,55 1250,20 1440,80 L1440,160 L0,160 Z"
          />
        </svg>

        <div className="-mt-px bg-[#5468bc] pb-32 pt-14 md:pb-44 md:pt-20">
          {/* Teks 2 kolom */}
          <div className="mx-auto grid max-w-6xl gap-8 px-5 md:grid-cols-2 md:gap-14">
            <Reveal>
              <div className="space-y-4 text-justify text-sm font-medium leading-7 text-blue-50">
                {a.history.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div className="space-y-4 text-justify text-sm font-medium leading-7 text-blue-50">
                <p>{a.body}</p>
                <p>{a.exp}</p>
              </div>
            </Reveal>
          </div>

          <div className="mx-auto max-w-6xl px-5">
            {/* VISION & MISSION */}
            <div className="mx-auto mt-16 grid max-w-2xl gap-6 sm:grid-cols-2 md:gap-10">
              <Reveal>
                <div className="flex h-full flex-col items-center rounded-3xl p-8 text-center transition duration-300 hover:-translate-y-1 hover:border-white hover:bg-white/10 hover:shadow-lg">
                  <IconBadge>
                    <IconVision />
                  </IconBadge>
                  <h3 className="mt-5 font-head text-2xl font-bold text-yellow-200">{a.vision.title}</h3>
                  <p className="mt-3 text-sm font-medium leading-7 text-blue-50">{a.vision.body}</p>
                </div>
              </Reveal>

              <Reveal delay={150}>
                <div className="flex h-full flex-col items-center rounded-3xl p-8 text-center transition duration-300 hover:-translate-y-1 hover:border-white hover:bg-white/10 hover:shadow-lg">
                  <IconBadge>
                    <IconMission />
                  </IconBadge>
                  <h3 className="mt-5 font-head text-2xl font-bold text-yellow-200">{a.mission.title}</h3>
                  <p className="mt-3 text-sm font-medium leading-7 text-blue-50">{a.mission.items}</p>
                </div>
              </Reveal>
            </div>

            {/* CORE VALUES */}
            <div className="mt-16">
              <Reveal>
                <div className="text-center">
                  <h3 className="font-head text-2xl font-bold uppercase text-blue-300 md:text-3xl">
                    {a.values.title}
                  </h3>
                  <p className="mx-auto mt-3 max-w-3xl text-sm leading-7 text-blue-50">{a.values.intro}</p>
                </div>
              </Reveal>

              <div className="mx-auto mt-8 grid max-w-3xl justify-items-center gap-8 sm:grid-cols-3">
                {a.values.items.map((name, i) => {
                  const Icon = VALUE_ICONS[i];
                  return (
                    <Reveal key={name} delay={i * 120}>
                      <div className="flex aspect-square w-36 flex-col items-center justify-center rounded-full text-center transition duration-300 hover:-translate-y-1 hover:border-white hover:bg-white/10 hover:shadow-lg md:w-44">
                        <IconBadge>
                          <Icon />
                        </IconBadge>
                        <p className="mt-3 font-head text-lg font-bold text-yellow-200">{name}</p>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}