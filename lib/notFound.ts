import { dict, type Lang } from "./i18n";
import { pathFor } from "./seo";

export const notFoundCopy = {
  en: {
    title: "Page not found",
    description: "The page may have moved or the address may be incorrect.",
    home: "Back to home",
    services: dict.en.nav.services,
  },
  id: {
    title: "Halaman tidak ditemukan",
    description: "Halaman mungkin sudah dipindah atau alamatnya salah.",
    home: "Kembali ke beranda",
    services: dict.id.nav.services,
  },
  zh: {
    title: "找不到页面",
    description: "该页面可能已移动，或网址有误。",
    home: "返回首页",
    services: dict.zh.nav.services,
  },
};

export function notFoundLinks(lang: Lang) {
  return { home: pathFor(lang), services: `${pathFor(lang)}#services` };
}
