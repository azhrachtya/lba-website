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

export const siteMeta: Record<Lang, { title: string; description: string; locale: string }> = {
  en: {
    title: "PT Lautan Berlian Abadi | Project Cargo & Freight Forwarding Indonesia",
    description: "Specialist in project cargo, customs clearance (PPJK), and sea freight across Indonesia since 2015.",
    locale: "en_US",
  },
  id: {
    title: "PT Lautan Berlian Abadi | Project Cargo & Freight Forwarding Indonesia",
    description: "Spesialis project cargo, PPJK, dan sea freight di seluruh Indonesia sejak 2015.",
    locale: "id_ID",
  },
  zh: {
    title: "PT Lautan Berlian Abadi | 印度尼西亚项目货物与货运代理",
    description: "自2015年起，专注印度尼西亚全境的项目货物、清关（PPJK）与海运服务。",
    locale: "zh_CN",
  },
};