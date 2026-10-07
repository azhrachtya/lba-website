import { getContent } from "@/lib/queries";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectsGrid from "@/components/ProjectsGrid";

export const revalidate = 60;

export default async function ProjectsPage() {
  const c = await getContent();
  return (
    <>
      <Navbar />
      <main>
        {/* Header halaman */}
        <section className="border-b border-slate-100 bg-mist py-14">
          <div className="mx-auto max-w-6xl px-5">
            <p className="text-xs font-semibold text-brand">Project portfolio</p>
            <h1 className="mt-2 font-head text-4xl font-bold">All deliveries</h1>
            <p className="mt-3 max-w-lg text-sm text-slate-500">
              Full record of breakbulk, heavylift, and project cargo shipments handled across Indonesia.
            </p>
          </div>
        </section>

        <ProjectsGrid projects={c.projects} />
      </main>
      <Footer />
    </>
  );
}
