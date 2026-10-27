"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";

type Dir = "up" | "left" | "right" | "scale";

// Durasi & jarak geser disamakan dengan WhyLBA
const HIDDEN: Record<Dir, string> = {
  up: "translate-y-5 opacity-0",
  left: "-translate-x-24 opacity-0",
  right: "translate-x-24 opacity-0",
  scale: "scale-95 opacity-0",
};

const DURATION: Record<Dir, string> = {
  up: "duration-300",
  left: "duration-1000",
  right: "duration-1000",
  scale: "duration-500",
};

export default function Reveal({
  children,
  delay = 0,
  dir = "up",
  duration,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  dir?: Dir;
  duration?: number; // ms, opsional: kalau diisi, geraknya lebih panjang dan halus
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px 0% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        ...(duration
          ? {
              transitionDuration: `${duration}ms`,
              transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
            }
          : {}),
      }}
      className={`transition-all ease-out motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:transition-none ${DURATION[dir]} ${
        show ? "translate-x-0 translate-y-0 scale-100 opacity-100" : HIDDEN[dir]
      } ${className}`}
    >
      {children}
    </div>
  );
}