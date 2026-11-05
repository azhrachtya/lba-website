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
        "PT Lautan Berlian Abadi provides project cargo, freight forwarding, customs clearance (PPJK) and sea freight across Indonesia. Trusted since 2015.",
    locale: "en_US",
  },
  id: {
    title: "Proyek Kargo & Pengiriman Barang Indonesia | LBA",
    description:
      "PT Lautan Berlian Abadi menyediakan layanan proyek kargo, pengiriman barang, kepabeanan (PPJK), dan pengiriman laut ke seluruh Indonesia. Telah dipercaya sejak 2015",
    locale: "id_ID",
  },
  zh: {
    title: "印度尼西亚项目货运与货运代理服务 | LBA",
    description:
        "PT Lautan Berlian Abadi 提供项目货物运输、货运代理、报关（PPJK）及印尼全境的海运服务。自2015年以来一直深受信赖.",
    locale: "zh_CN",
  },
};