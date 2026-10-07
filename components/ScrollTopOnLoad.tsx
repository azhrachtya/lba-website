"use client";
import { useEffect } from "react";

// Kalau URL masih ada hash (#contact, dll) tapi ini full page reload (F5),
// paksa scroll ke atas dulu. Klik menu (SPA navigation) tetap jalan normal ke section-nya.
export default function ScrollTopOnLoad() {
  useEffect(() => {
    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    const isReload = nav?.type === "reload" || !nav;
    if (isReload && window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
      window.scrollTo(0, 0);
    }
  }, []);
  return null;
}
