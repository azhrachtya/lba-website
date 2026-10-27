import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceDetail from "@/components/ServiceDetail";
import { services, getService } from "@/lib/serviceContent";
import { getServiceImages, getServiceHeroImages } from "@/lib/queries";

export const dynamic = "force-dynamic";

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

  return (
    <>
      <Navbar />
      <main>
        <ServiceDetail s={s} images={images} heroImages={heroImages} />
      </main>
      <Footer />
    </>
  );
}