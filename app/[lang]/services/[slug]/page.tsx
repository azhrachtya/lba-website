import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceDetail from "@/components/ServiceDetail";
import { getService } from "@/lib/serviceContent";
import {
  getContent,
  getDetailSlugs,
  getServiceHeroImages,
  getServiceImages,
} from "@/lib/queries";
import { SITE_URL, alternatesFor, isLang, pathFor } from "@/lib/seo";
import {
  getCardsBySlugs,
  getDetailImages,
  getRelatedCards,
  getSanityService,
} from "@/lib/serviceFromSanity";
import type { Lang } from "@/lib/i18n";

export const revalidate = 300;

type Props = { params: Promise<{ lang: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLang(lang)) return {};

  const service =
    (await getSanityService(slug, lang as Lang)) || getService(slug);
  if (!service) return {};

  return {
    title: service.heroTitle,
    description: service.heroDescription,
    alternates: alternatesFor(lang, `/services/${service.slug}`),
    robots:
      process.env.ROBOTS_INDEX === "false"
        ? { index: false, follow: false }
        : { index: true, follow: true },
  };
}

export default async function ServicePage({ params }: Props) {
  const { lang, slug } = await params;
  if (!isLang(lang)) return notFound();

  const fromCms = await getSanityService(slug, lang as Lang);
  const service = fromCms ?? getService(slug);
  if (!service) return notFound();

  const images = await getServiceImages();
  const heroImages = await getServiceHeroImages();
  const extra = await getDetailImages(slug);

  if (extra.hero) heroImages[service.slug] = extra.hero;
  if (extra.card || extra.hero) {
    images[service.slug] = (extra.card || extra.hero) as string;
  }

  const extraSlugs = (service.relatedSlugs || []).filter(
    (relatedSlug) => !getService(relatedSlug),
  );
  const relatedCards = [
    ...(await getRelatedCards(slug, lang as Lang)),
    ...(await getCardsBySlugs(extraSlugs, lang as Lang)),
  ];

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE_URL}${pathFor(lang, "")}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: service.navTitle,
        item: `${SITE_URL}${pathFor(lang, `/services/${service.slug}`)}`,
      },
    ],
  };

  const content = await getContent();
  const slugs = await getDetailSlugs();
  const footerServices = content.services.map((item: any) => ({
    ...item,
    detailSlug: slugs[item._id],
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Navbar />
      <main>
        <ServiceDetail
          s={service}
          images={images}
          heroImages={heroImages}
          preLocalized={Boolean(fromCms)}
          relatedCards={relatedCards}
        />
      </main>
      <Footer services={footerServices} />
    </>
  );
}
