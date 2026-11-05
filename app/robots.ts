import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  if (process.env.ROBOTS_INDEX === "false") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/studio", "/api"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
