import { cache } from "react";
import { client } from "@/sanity/lib/client";
import { translateText } from "@/lib/translate";
import type { ServiceContent } from "./serviceContent";
import type { Lang } from "./i18n";
import { matchSlugFromTitle } from "./serviceContent";


type L = { en?: string; id?: string; zh?: string } | null | undefined;

async function pick(l: L, lang: Lang): Promise<string> {
  if (!l) return "";
  if (lang === "en") return l.en || "";
  if (l[lang]) return l[lang] as string;
  if (!l.en) return "";
  try {
    return (await translateText(l.en, lang)) || l.en;
  } catch (e) {
    console.warn("translate gagal, pakai Inggris", e);
    return l.en;
  }
}

const match = `_type=="serviceDetail" && (slug.current == $slug || service->pageSlug == $slug)`;

const query = `*[${match}][0]{
  heroTitle, heroTagline, heroDescription, whatWeHandleTitle,
  "navTitle": service->title,
  groups[]{ heading, items[]{ title, desc } },
  "related": related[]->pageSlug
}`;

export const getSanityService = cache(
  async (slug: string, lang: Lang): Promise<ServiceContent | null> => {
    let d: any = null;
    try {
      d = await client.fetch(query, { slug }, { next: { revalidate: 300 } });
    } catch (e) {
      console.warn("getSanityService gagal:", e);
      return null;
    }
    if (!d) return null; // tidak ada di Sanity -> pakai data kode

    const groups = await Promise.all(
      (d?.groups || []).map(async (g: any) => ({
        heading: (await pick(g.heading, lang)) || undefined,
        items: await Promise.all(
          (g.items || []).map(async (it: any) => ({
            title: await pick(it.title, lang),
            desc: await pick(it.desc, lang),
          }))
        ),
      }))
    );

    return {
      slug,
      navTitle: await pick(d.navTitle, lang),
      navDescription: "",
      heroTitle: await pick(d.heroTitle, lang),
      heroTagline: await pick(d.heroTagline, lang),
      heroDescription: await pick(d.heroDescription, lang),
      whatWeHandleTitle: await pick(d.whatWeHandleTitle, lang),
      whatWeHandleGroups: groups,
      relatedSlugs: (d.related || []).filter(Boolean),
    };
  }
);

// Foto hero/kartu dari layanan yang dipilih di dokumen detail
export async function getDetailImages(slug: string) {
  try {
    const d: any = await client.fetch(
      `*[_type=="serviceDetail" && slug.current == $slug][0]{
        "hero": service->heroImage.asset->url,
        "card": service->image.asset->url
      }`,
      { slug },
      { next: { revalidate: 300 } }
    );
    return { hero: d?.hero as string | undefined, card: d?.card as string | undefined };
  } catch {
    return { hero: undefined, card: undefined };
  }
}

// Related Services dari Sanity: tiap kartu langsung mengarah ke halaman tujuannya
export type RelatedCard = { slug: string; title: string; image?: string };

const relQuery = `*[${match}][0].related[]->{
  "slug": coalesce(
    *[_type=="serviceDetail" && service._ref == ^._id && defined(slug.current)][0].slug.current,
    pageSlug
  ),
  title,
  "image": coalesce(heroImage.asset->url, image.asset->url)
}`;

export const getRelatedCards = cache(
  async (slug: string, lang: Lang): Promise<RelatedCard[]> => {
    let rows: any[] | null = null;
    try {
      rows = await client.fetch(relQuery, { slug }, { next: { revalidate: 300 } });
    } catch (e) {
      console.warn("getRelatedCards gagal:", e);
      return [];
    }
    if (!rows?.length) return [];
    const cards = await Promise.all(
      rows
        .filter(Boolean)
        .map(async (r) => {
          const s = r.slug || matchSlugFromTitle(r.title?.en || "");
          if (!s || s === slug) return null;
          return {
            slug: s as string,
            title: await pick(r.title, lang),
            image: r.image as string | undefined,
          };
        })
    );
    return cards.filter(Boolean) as RelatedCard[];
  }
);

export async function getCardsBySlugs(slugs: string[], lang: Lang): Promise<RelatedCard[]> {
  if (!slugs.length) return [];
  try {
    const rows: any[] = await client.fetch(
      `*[_type=="serviceDetail" && slug.current in $slugs]{
        "slug": slug.current,
        "title": service->title,
        "image": coalesce(service->heroImage.asset->url, service->image.asset->url)
      }`,
      { slugs },
      { next: { revalidate: 300 } }
    );
    return Promise.all(
      rows.map(async (r) => ({
        slug: r.slug as string,
        title: await pick(r.title, lang),
        image: r.image as string | undefined,
      }))
    );
  } catch (e) {
    console.warn("getCardsBySlugs gagal:", e);
    return [];
  }
}