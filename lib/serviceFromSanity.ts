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

const detailMatch = `_type == "serviceDetail" && slug.current == $slug`;

const query = `*[${detailMatch}][0]{
  heroTitle, heroTagline, heroDescription, whatWeHandleTitle,
  "navTitle": service->title,
  groups[]{ heading, items[]{ title, desc } }
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
    };
  }
);

// Foto hero dari layanan yang dipilih di dokumen detail
export async function getDetailHeroImage(slug: string): Promise<string | undefined> {
  try {
    const image = await client.fetch<string | null>(
      `*[${detailMatch}][0].service->heroImage.asset->url`,
      { slug },
      { next: { revalidate: 300 } }
    );
    return image ?? undefined;
  } catch {
    return undefined;
  }
}

// Related Services dari Sanity: tiap kartu langsung mengarah ke halaman tujuannya
export type RelatedCard = { slug: string; title: string; image?: string };

const linkedDetailSlug = `*[_type == "serviceDetail" && service._ref == ^._id && defined(slug.current)][0].slug.current`;

const relatedFields = `{
  "slug": coalesce(${linkedDetailSlug}, pageSlug),
  title,
  "image": coalesce(heroImage.asset->url, image.asset->url)
}`;

const relQuery = `{
  "detail": *[${detailMatch}][0]{
    "related": coalesce(related, []) + coalesce(service->related, [])
  }.related[]->${relatedFields},
  "legacy": *[_type == "service" && (pageSlug == $slug || !defined(pageSlug)) && !defined(${linkedDetailSlug})]{
    pageSlug, title,
    "related": related[]->${relatedFields}
  }
}`;

type RelatedRow = { slug: string | null; title: L; image: string | null };
type RelatedResult = {
  detail: (RelatedRow | null)[] | null;
  legacy: { pageSlug: string | null; title: L; related: (RelatedRow | null)[] | null }[];
};

export const getRelatedCards = cache(
  async (slug: string, lang: Lang): Promise<RelatedCard[]> => {
    let data: RelatedResult;
    try {
      data = await client.fetch(relQuery, { slug }, { next: { revalidate: 120 } });
    } catch (e) {
      console.warn("getRelatedCards gagal:", e);
      return [];
    }

    const legacy = data.legacy.find((r) => r.pageSlug === slug)
      ?? data.legacy.find((r) => !r.pageSlug && matchSlugFromTitle(r.title?.en || "") === slug);
    const rows = data.detail ?? legacy?.related ?? [];
    const seen = new Set([slug]);
    const cards = await Promise.all(
      rows.map(async (r): Promise<RelatedCard | null> => {
        if (!r) return null;
        const s = r.slug || matchSlugFromTitle(r.title?.en || "");
        if (!s || seen.has(s)) return null;
        seen.add(s);
        return {
          slug: s,
          title: await pick(r.title, lang),
          image: r.image ?? undefined,
        };
      })
    );
    return cards.filter((card): card is RelatedCard => card !== null);
  }
);
