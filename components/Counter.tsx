"use client";
import { useEffect, useRef, useState } from "react";

// Angka ngitung dari 0 ke angka target, mulai jalan begitu elemen ini
// kelihatan di layar (pas di-scroll ke situ), bukan cuma pas page pertama load.
export default function Counter({
  to,
  suffix = "",
  duration = 1500,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();

          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            setValue(Math.floor(progress * to));
            if (progress < 1) requestAnimationFrame(tick);
            else setValue(to); // pastiin berhenti pas di angka final
          };

          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [to, duration]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}
