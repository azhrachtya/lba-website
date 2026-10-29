import type { Metadata } from "next";
import { getContent } from "@/lib/queries";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectsGrid from "@/components/ProjectsGrid";
import ProjectsHeader from "@/components/ProjectsHeader";
import { dict } from "@/lib/i18n";
import { alternatesFor, isLang } from "@/lib/seo";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  if (!isLang(params.lang)) return {};
  const p = dict[params.lang].portfolio;
  return {
    title: p.titlegrid,
    description: p.descgrid,
    alternates: alternatesFor(params.lang, "/projects"),
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