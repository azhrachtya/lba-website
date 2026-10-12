
import { getContent } from "@/lib/queries";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectsGrid from "@/components/ProjectsGrid";
import ProjectsHeader from "@/components/ProjectsHeader";

export const revalidate = 60;

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
