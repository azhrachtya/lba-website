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
import { alternatesFor, isLang, siteMeta, SITE_NAME, SOCIAL_IMAGE } from "@/lib/seo";
import { mergeOffices, officeKey } from "@/lib/offices";



export const revalidate = 120;

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  if (!isLang(params.lang)) return {};

  const meta = siteMeta[params.lang];

  return {
    title: meta.title,
    description: meta.description,

    alternates: alternatesFor(params.lang),

    openGraph: {
      title: meta.title,
      description: meta.description,
      url: alternatesFor(params.lang).canonical,
      siteName: SITE_NAME,
      images: [SOCIAL_IMAGE],
      locale: meta.locale,
      type: "website",
    },
  };
}

export default async function Home() {
  const [c, v, slugs] = await Promise.all([getContent(), getHeroVideos(), getDetailSlugs()]);
  const services = c.services.map((s: any) => ({ ...s, detailSlug: slugs[s._id] }));
  const offices = mergeOffices(c.offices).map(({ email, ...office }) => ({
    ...office,
    emailOffice: email ? officeKey(office.city) : undefined,
  }));
  const coverageOffices = c.offices.map(({ email: _email, ...office }: { email?: string; [key: string]: any }) => office);
  return (
    <>
      <Navbar />
      <main>
      <Hero
      image={c.settings.heroImage} videoMp4={v.mp4} videoWebm={v.webm}/>
       <About image={c.settings.aboutImage} />
        <WhyLBA />
        <Services services={services} />
        <Portfolio projects={c.projects.slice(0, 4)} />
        <Coverage offices={coverageOffices} />
        <Clients clients={c.clients} />
        <Contact offices={offices} />
      </main>
        <Footer services={services} offices={offices} />
    </>
  );
}
