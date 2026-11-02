import type { MetadataRoute } from "next";
import { services } from "@/lib/serviceContent";
import { LOCALES, SITE_URL, pathFor } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = (l: (typeof LOCALES)[number], p = "") => `${SITE_URL}${pathFor(l, p)}`;

  // Semua halaman, dalam tiga bahasa
  const pages = ["", "/projects", ...services.map((s) => `/services/${s.slug}`)];

  return LOCALES.flatMap((l) => pages.map((p) => ({ url: url(l, p), lastModified: now })));
}