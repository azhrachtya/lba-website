
"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const ENABLED = process.env.NEXT_PUBLIC_LAUNCH_INTRO === "true";
const KEY = "lba-launch-intro-seen";

export default function LaunchIntro({ lang }: { lang: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const homePath = lang === "en" ? "/" : `/${lang}`;

  const [show, setShow] = useState(false);
  const [started, setStarted] = useState(false);
  const [fading, setFading] = useState(false);
  const [navigating, setNavigating] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const finishedRef = useRef(false);

  // Cek apakah intro sudah pernah ditampilkan
  useEffect(() => {
    if (!ENABLED) return;

    try {
      if (sessionStorage.getItem(KEY)) return;
    } catch {}

    setShow(true);
  }, []);

  // Kunci scroll selama intro tampil
  useEffect(() => {
    if (!show) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prev;
    };
  }, [show]);

  // Setelah sampai di Home, baru tutup overlay
  useEffect(() => {
    const currentPath = pathname.replace(/\/$/, "") || "/";
    const targetPath = homePath.replace(/\/$/, "") || "/";

    if (!navigating || currentPath !== targetPath) return;

    setFading(true);

    const timer = setTimeout(() => {
      setShow(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigating, pathname, homePath]);

  // Selesaikan intro dan arahkan ke Home
  const close = () => {
    if (finishedRef.current) return;

    finishedRef.current = true;

    try {
      sessionStorage.setItem(KEY, "1");
    } catch {}

    setNavigating(true);

    // Jika sudah di Home, tidak perlu navigasi ulang
    const currentPath = pathname.replace(/\/$/, "") || "/";
    const targetPath = homePath.replace(/\/$/, "") || "/";

    if (currentPath !== targetPath) {
      router.replace(homePath);
    }
  };

  const start = () => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    setStarted(true);

    video.play().catch((error) => {
      console.error("Launch video gagal:", error);
      setStarted(false);
    });
  };

  if (!ENABLED || !show) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black transition-opacity duration-1000 ease-in-out ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      <video
        ref={videoRef}
        src="/videos/intro-countdown.mp4"
        playsInline
        preload="auto"
        onEnded={close}
        className="h-full w-full object-contain"
      />

      {!started && (
        <button
          onClick={start}
          className="absolute rounded-full bg-white px-8 py-4 text-lg font-semibold text-slate-900 shadow-lg"
        >
          ▶ Klik untuk mulai · Click to start
        </button>
      )}

      
    </div>
  );
}
