import { cache } from "react";
import { client } from "@/sanity/lib/client";
import { translateTexts } from "@/lib/translate";
import type { ServiceContent } from "./serviceContent";
import type { Lang } from "./i18n";
import { getService, matchSlugFromTitle } from "./serviceContent";
import { localize } from "./serviceTranslations";
import { mergeServiceDetail } from "./serviceMerge";
import {
  localizeLocalizedValues,
  resolveCanonicalServiceSlug,
} from "./serviceDocument";

const match = `_type=="serviceDetail" && (slug.current == $slug || service->pageSlug == $slug)`;

const query = `*[${match}][0]{
  heroTitle, heroTagline, heroDescription, whatWeHandleTitle,
  "currentSlug": slug.current,
  "legacySlug": service->pageSlug,
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

    const canonicalSlug = resolveCanonicalServiceSlug(
      slug,
      d.currentSlug,
      d.legacySlug,
    );

    const groupRows = d?.groups || [];
    const localizedValues = [
      d.navTitle,
      d.heroTitle,
      d.heroTagline,
      d.heroDescription,
      d.whatWeHandleTitle,
      ...groupRows.flatMap((group: any) => [
        group.heading,
        ...(group.items || []).flatMap((item: any) => [item.title, item.desc]),
      ]),
    ];
    const localized = await localizeLocalizedValues(
      localizedValues,
      lang,
      translateTexts,
    );
    let localizedIndex = 0;
    const navTitle = localized[localizedIndex++];
    const heroTitle = localized[localizedIndex++];
    const heroTagline = localized[localizedIndex++];
    const heroDescription = localized[localizedIndex++];
    const whatWeHandleTitle = localized[localizedIndex++];
    const groups = groupRows.map((group: any) => ({
      heading: localized[localizedIndex++] || undefined,
      items: (group.items || []).map(() => ({
        title: localized[localizedIndex++],
        desc: localized[localizedIndex++],
      })),
    }));

    const cmsService: ServiceContent = {
      slug: canonicalSlug,
      navTitle,
      navDescription: "",
      heroTitle,
      heroTagline,
      heroDescription,
      whatWeHandleTitle,
      whatWeHandleGroups: groups,
      relatedSlugs: (d.related || []).filter(Boolean),
    };

    const fallback =
      getService(d.legacySlug || "") || getService(slug) || getService(canonicalSlug);
    return mergeServiceDetail(
      cmsService,
      fallback ? localize(fallback, lang) : null,
    );
  }
);

// Foto hero/kartu dari layanan yang dipilih di dokumen detail
export async function getDetailImages(slug: string) {
  try {
    const d: any = await client.fetch(
      `*[${match}][0]{
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
    const validRows = rows.filter(Boolean);
    const titles = await localizeLocalizedValues(
      validRows.map((row) => row.title),
      lang,
      translateTexts,
    );
    const cards = validRows
        .map((r, index) => {
          const s = r.slug || matchSlugFromTitle(r.title?.en || "");
          if (!s || s === slug) return null;
          return {
            slug: s as string,
            title: titles[index],
            image: r.image as string | undefined,
          };
        });
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
    const titles = await localizeLocalizedValues(
      rows.map((row) => row.title),
      lang,
      translateTexts,
    );
    return rows.map((r, index) => ({
        slug: r.slug as string,
        title: titles[index],
        image: r.image as string | undefined,
      }));
  } catch (e) {
    console.warn("getCardsBySlugs gagal:", e);
    return [];
  }
}