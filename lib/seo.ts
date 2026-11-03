import type { Lang } from "@/lib/i18n";

export const SITE_URL = "https://www.lbalogistics.id";
export const LOCALES: Lang[] = ["en", "id", "zh"];
export const isLang = (v: string): v is Lang => (LOCALES as string[]).includes(v);

// "/projects" -> en: "/projects", id: "/id/projects"
export const pathFor = (lang: Lang, path = "") =>
  lang === "en" ? path || "/" : `/${lang}${path}`;

export const alternatesFor = (lang: Lang, path = "") => ({
  canonical: pathFor(lang, path),
  languages: {
    en: pathFor("en", path),
    id: pathFor("id", path),
    zh: pathFor("zh", path),
    "x-default": pathFor("en", path),
  },
});

export const siteMeta: Record<Lang, {
  title: string;
  description: string;
  locale: string;
}> = {
  en: {
    title: "Project Cargo & Freight Forwarding Indonesia | LBA",
    description:
      "PT Lautan Berlian Abadi provides project cargo, freight forwarding, customs clearance (PPJK), and sea freight services across Indonesia. Trusted logistics solutions since 2015.",
    locale: "en_US",
  },
  id: {
    title: "Project Cargo & Freight Forwarding Indonesia | LBA",
    description:
      "PT Lautan Berlian Abadi menyediakan layanan project cargo, freight forwarding, PPJK, dan sea freight ke seluruh Indonesia sejak 2015.",
    locale: "id_ID",
  },
  zh: {
    title: "印度尼西亚项目货运与货运代理服务 | LBA",
    description:
      "PT Lautan Berlian Abadi 提供印度尼西亚全境的项目货物运输、货运代理、清关及海运服务。",
    locale: "zh_CN",
  },
};