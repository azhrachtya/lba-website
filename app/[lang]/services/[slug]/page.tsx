import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceDetail from "@/components/ServiceDetail";
import { getService } from "@/lib/serviceContent";
import { getServiceImages, getServiceHeroImages, getContent, getDetailSlugs } from "@/lib/queries";
import { SITE_URL, isLang, pathFor, alternatesFor } from "@/lib/seo";
import { getSanityService, getDetailImages, getRelatedCards, getCardsBySlugs } from "@/lib/serviceFromSanity";
import type { Lang } from "@/lib/i18n";
import { localize } from "@/lib/serviceTranslations";


export const revalidate = 300; // Revalidasi halaman setiap 5 menit

type Props = { params: { lang: string; slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!isLang(params.lang)) return {};
  const cms = await getSanityService(params.slug, params.lang as Lang);
  const base = getService(params.slug);
  const s = cms ?? (base ? localize(base, params.lang as Lang) : null);
  if (!s) return {};
  return {
    title: s.heroTitle,
    description: s.heroDescription,
alternates: alternatesFor(params.lang as Lang, `/services/${s.slug}`),
    robots: { index: true, follow: true },
  };
}

export default async function ServicePage({ params }: Props) {
  if (!isLang(params.lang)) return notFound();
  const fromCms = await getSanityService(params.slug, params.lang as Lang);
  const baseS = getService(params.slug);
  const s = fromCms ?? (baseS ? localize(baseS, params.lang as Lang) : null);
  if (!s) return notFound();
  const images = await getServiceImages();
  const heroImages = await getServiceHeroImages();
  const extra = await getDetailImages(params.slug);
if (extra.hero) heroImages[s.slug] = extra.hero;
if (extra.card || extra.hero) images[s.slug] = (extra.card || extra.hero) as string;
const extraSlugs = (s.relatedSlugs || []).filter((x) => !getService(x));
const relatedCards = [
  ...(await getRelatedCards(params.slug, params.lang as Lang)),
  ...(await getCardsBySlugs(extraSlugs, params.lang as Lang)),
];
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}${pathFor(params.lang, "")}` },
      { "@type": "ListItem", position: 2, name: s.navTitle, item: `${SITE_URL}${pathFor(params.lang, `/services/${s.slug}`)}` },
    ],
  };
  const content = await getContent();
const slugs = await getDetailSlugs();
const footerServices = content.services.map((x: any) => ({ ...x, detailSlug: slugs[x._id] }));  

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c") }}
      />
      <Navbar />
      <main>
<ServiceDetail s={s} images={images} heroImages={heroImages} preLocalized={!!fromCms} relatedCards={relatedCards} />    
</main>
      <Footer services={footerServices} />
    </>
  );
}