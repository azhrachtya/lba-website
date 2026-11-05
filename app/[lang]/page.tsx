import { getContent, getHeroVideos, getDetailSlugs } from "@/lib/queries";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import WhyLBA from "@/components/WhyLBA";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Coverage from "@/components/Coverage";
import Clients from "@/components/Clients";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { alternatesFor, isLang, siteMeta } from "@/lib/seo";
import { mergeOffices } from "@/lib/offices";
import { buildHomeViewModel } from "@/lib/serviceDocument";



export const revalidate = 3600; // konten Sanity di-refresh tiap satu jam

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};

  const meta = siteMeta[lang];

  return {
    title: meta.title,
    description: meta.description,

    alternates: alternatesFor(lang),

    openGraph: {
      title: meta.title,
      description: meta.description,
      url: alternatesFor(lang).canonical,
      siteName: "PT Lautan Berlian Abadi",
      locale: meta.locale,
      type: "website",
    },
  };
}

export default async function Home() {
  const c = await getContent();
  const v = await getHeroVideos();
  const slugs = await getDetailSlugs();
  const services = c.services.map((s: any) => ({ ...s, detailSlug: slugs[s._id] }));
  const view = buildHomeViewModel(c, mergeOffices);
  return (
    <>
      <Navbar />
      <main>
      <Hero
      image={view.heroPoster} videoMp4={v.mp4} videoWebm={v.webm}/>
       <About image={c.settings.aboutImage} />
        <WhyLBA />
        <Services services={services} />
        <Portfolio projects={c.projects} />
        <Coverage offices={view.offices} />
        <Clients clients={c.clients} />
        <Contact offices={view.offices} />
      </main>
        <Footer services={services} />
    </>
  );
}
