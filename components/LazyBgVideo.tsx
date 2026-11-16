
"use client";

import { useEffect, useRef, useState } from "react";

export default function LazyBgVideo({
  webm,
  mp4,
  poster,
  className = "",
}: {
  webm?: string;
  mp4?: string;
  poster?: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);

  // Aktifkan video ketika mendekati viewport
  useEffect(() => {
    const el = ref.current;

    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let frame = 0;
    let timeout = 0;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          frame = window.requestAnimationFrame(() => {
            timeout = window.setTimeout(() => {
              setActive(true);
            }, 350);
          });

          io.disconnect();
        }
      },
      { rootMargin: "300px" }
    );

    io.observe(el);

    return () => {
      io.disconnect();
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
    };
  }, []);

  // Muat dan putar video
  useEffect(() => {
    const el = ref.current;

    if (!active || !el) return;

    const playVideo = () => {
      el.play().catch(() => {});
    };

    el.load();

    if (el.readyState >= 3) {
      playVideo();
    } else {
      el.addEventListener("canplay", playVideo, { once: true });
    }

    return () => {
      el.removeEventListener("canplay", playVideo);
    };
  }, [active]);

  return (
    <video
      ref={ref}
      className={className}
      muted
      loop
      autoPlay
      playsInline
      preload="none"
      poster={poster}
      aria-hidden="true"
    >
      {active && webm && (
        <source src={webm} type="video/webm" />
      )}

      {active && mp4 && (
        <source src={mp4} type="video/mp4" />
      )}
    </video>
  );
}
