import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceDetail from "@/components/ServiceDetail";
import { getService } from "@/lib/serviceContent";
import { getServiceHeroImages, getContent, getDetailSlugs } from "@/lib/queries";
import { SITE_URL, SITE_NAME, SOCIAL_IMAGE, isLang, pathFor, alternatesFor, siteMeta } from "@/lib/seo";
import { getSanityService, getDetailHeroImage, getRelatedCards } from "@/lib/serviceFromSanity";
import type { Lang } from "@/lib/i18n";
import { localize } from "@/lib/serviceTranslations";


export const revalidate = 120;

type Props = { params: { lang: string; slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!isLang(params.lang)) return {};
  const cms = await getSanityService(params.slug, params.lang as Lang);
  const base = getService(params.slug);
  const s = cms ?? (base ? localize(base, params.lang as Lang) : null);
  if (!s) return {};
  const alternates = alternatesFor(params.lang, `/services/${s.slug}`);
  return {
    title: s.heroTitle,
    description: s.heroDescription,
    alternates,
    openGraph: {
      title: `${s.heroTitle} | ${SITE_NAME}`,
      description: s.heroDescription,
      url: alternates.canonical,
      siteName: SITE_NAME,
      images: [SOCIAL_IMAGE],
      locale: siteMeta[params.lang].locale,
      type: "website",
    },
    robots: { index: true, follow: true },
  };
}

export default async function ServicePage({ params }: Props) {
  if (!isLang(params.lang)) return notFound();
  const fromCms = await getSanityService(params.slug, params.lang as Lang);
  const baseS = getService(params.slug);
  const s = fromCms ?? (baseS ? localize(baseS, params.lang as Lang) : null);
  if (!s) return notFound();
  const [slugs, heroImages, heroImage, relatedCards] = await Promise.all([
    getDetailSlugs(),
    getServiceHeroImages(),
    getDetailHeroImage(params.slug),
    getRelatedCards(params.slug, params.lang as Lang),
  ]);
  if (heroImage) heroImages[s.slug] = heroImage;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}${pathFor(params.lang, "")}` },
      { "@type": "ListItem", position: 2, name: s.navTitle, item: `${SITE_URL}${pathFor(params.lang, `/services/${s.slug}`)}` },
    ],
  };
  const content = await getContent();
  const footerServices = content.services.map((x: any) => ({ ...x, detailSlug: slugs[x._id] }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c") }}
      />
      <Navbar />
      <main>
        <ServiceDetail s={s} heroImages={heroImages} preLocalized={!!fromCms} relatedCards={relatedCards} />
      </main>
      <Footer services={footerServices} />
    </>
  );
}