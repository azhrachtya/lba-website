import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceDetail from "@/components/ServiceDetail";
import { services, getService } from "@/lib/serviceContent";

// Next.js generate ke-6 halaman ini otomatis pas build (gak nunggu diakses dulu)
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const s = getService(params.slug);
  if (!s) return notFound();

  return (
    <>
      <Navbar />
      <main>
        <ServiceDetail s={s} />
      </main>
      <Footer />
    </>
  );
}
