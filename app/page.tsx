import { getContent } from "@/lib/queries";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import WhyLBA from "@/components/WhyLBA";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Coverage from "@/components/Coverage";
import Clients from "@/components/Clients";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const revalidate = 60; // konten Sanity di-refresh tiap 60 detik

export default async function Home() {
  const c = await getContent();
  return (
    <>
      <Navbar />
      <main>
        <Hero image={c.settings.heroImage} />
        <About image={c.settings.aboutImage} />
        <WhyLBA />
        <Services services={c.services} />
        <Portfolio projects={c.projects} />
        <Coverage offices={c.offices} />
        <Clients clients={c.clients} />
        <CTA image={c.settings.ctaImage} whatsapp={c.offices[0]?.whatsapp} phone={c.offices[0]?.phone} />
        <Contact offices={c.offices} />
      </main>
      <Footer />
    </>
  );
}
