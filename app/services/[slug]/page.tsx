import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceDetail from "@/components/ServiceDetail";
import { getService } from "@/lib/serviceContent";
import { getServiceImages, getServiceHeroImages } from "@/lib/queries";

export const dynamic = "force-dynamic";

const SITE_URL = "https://www.lbalogistics.id"; // samakan persis dengan SITE_URL di layout.tsx

// BARU: judul dan deskripsi tiap halaman layanan
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const s = getService(params.slug);
  if (!s) return {};
  return { title: s.heroTitle, description: s.heroDescription };
}

export default async function ServicePage({ params }: { params: { slug: string } }) {
  const s = getService(params.slug);
  if (!s) return notFound();
  const images = await getServiceImages();
  const heroImages = await getServiceHeroImages();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: s.navTitle, item: `${SITE_URL}/services/${s.slug}` },
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