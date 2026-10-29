import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceDetail from "@/components/ServiceDetail";
import { getService } from "@/lib/serviceContent";
import { getServiceImages, getServiceHeroImages } from "@/lib/queries";
import { SITE_URL, isLang, pathFor } from "@/lib/seo";

export const dynamic = "force-dynamic";

type Props = { params: { lang: string; slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getService(params.slug);
  if (!s || !isLang(params.lang)) return {};
  return {
    title: s.heroTitle,
    description: s.heroDescription,
    alternates: { canonical: pathFor(params.lang, `/services/${s.slug}`) },
    // Sementara: versi ID dan 中文 jangan diindeks (teksnya masih diterjemahkan di browser)
    robots: params.lang === "en" ? undefined : { index: false, follow: true },
  };
}

export default async function ServicePage({ params }: Props) {
  const s = getService(params.slug);
  if (!s || !isLang(params.lang)) return notFound();
  const images = await getServiceImages();
  const heroImages = await getServiceHeroImages();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}${pathFor(params.lang, "")}` },
      { "@type": "ListItem", position: 2, name: s.navTitle, item: `${SITE_URL}${pathFor(params.lang, `/services/${s.slug}`)}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c") }}
      />
      <Navbar />
      <main>
        <ServiceDetail s={s} images={images} heroImages={heroImages} />
      </main>
      <Footer />
    </>
  );
}