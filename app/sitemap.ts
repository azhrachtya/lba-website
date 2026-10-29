import type { MetadataRoute } from "next";
import { services } from "@/lib/serviceContent";

const base = "https://www.lbalogistics.id";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base, lastModified: new Date() },
    { url: `${base}/projects`, lastModified: new Date() },
    ...services.map((s) => ({ url: `${base}/services/${s.slug}`, lastModified: new Date() })),
  ];
}