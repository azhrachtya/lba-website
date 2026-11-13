import type { Metadata } from "next";
import { getContent } from "@/lib/queries";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectsGrid from "@/components/ProjectsGrid";
import ProjectsHeader from "@/components/ProjectsHeader";
import { dict } from "@/lib/i18n";
import { alternatesFor, isLang, SITE_NAME, SOCIAL_IMAGE, siteMeta } from "@/lib/seo";

export const revalidate = 300;

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  if (!isLang(params.lang)) return {};
  const { lang } = params;
  const p = dict[lang].portfolio;
  const alternates = alternatesFor(lang, "/projects");
  return {
    title: p.titlegrid,
    description: p.descgrid,
    alternates,
    openGraph: {
      title: `${p.titlegrid} | ${SITE_NAME}`,
      description: p.descgrid,
      url: alternates.canonical,
      siteName: SITE_NAME,
      images: [SOCIAL_IMAGE],
      locale: siteMeta[lang].locale,
      type: "website",
    },
  };
}

export default async function ProjectsPage() {
  const c = await getContent();

  return (
    <>
      <Navbar />
      <main>
        <ProjectsHeader />
        <ProjectsGrid projects={c.projects} />
      </main>
      <Footer />
    </>
  );
}