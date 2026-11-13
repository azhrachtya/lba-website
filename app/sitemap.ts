import type { MetadataRoute } from "next";
import { getDetailSlugs } from "@/lib/queries";
import { services } from "@/lib/serviceContent";
import { LOCALES, SITE_URL, pathFor } from "@/lib/seo";

export const revalidate = 120;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cmsSlugs = Object.values(await getDetailSlugs());
  const serviceSlugs = new Set([...services.map((service) => service.slug), ...cmsSlugs]);
  const pages = ["", "/projects", ...Array.from(serviceSlugs, (slug) => `/services/${slug}`)];
  return LOCALES.flatMap((lang) =>
    pages.map((page) => ({ url: `${SITE_URL}${pathFor(lang, page)}` }))
  );
}
