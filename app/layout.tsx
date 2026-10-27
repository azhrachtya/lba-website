import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Libre_Baskerville } from "next/font/google";
import "./globals.css";
import LangProvider from "@/components/LangProvider";
import ScrollTopOnLoad from "@/components/ScrollTopOnLoad";
import FloatingConsult from "@/components/FloatingConsult";
import { getContent } from "@/lib/queries";
import { defaultOffices } from "@/lib/defaults";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });
const librebaskerville = Libre_Baskerville({ subsets: ["latin"], weight: ["400"], variable: "--font-libre-baskerville" });

const SITE_URL = "https://www.NAMADOMAIN.com"; // ganti dengan domain asli (cukup di sini)
const PHONE = "+6281219769494"; // samakan dengan nomor di bagian Contact

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "PT Lautan Berlian Abadi | Project Cargo & Freight Forwarding Indonesia",
    template: "%s | PT Lautan Berlian Abadi",
  },
  description: "Spesialis Project Cargo, PPJK Customs, Sea Freight ke Indonesia Timur sejak 2015.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "PT Lautan Berlian Abadi",
    description: "Project Cargo & Freight Forwarding Indonesia",
    url: "/",
    siteName: "PT Lautan Berlian Abadi",
    type: "website",
    images: [{ url: "/images/og.jpeg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const c = await getContent();

  // Cari kantor Jakarta untuk alamat di data terstruktur
  const offices: any[] = c.offices?.length ? c.offices : defaultOffices;
  const jakartaOffice = offices.find((o) => o?.city?.en?.toLowerCase().includes("jakarta"));

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PT Lautan Berlian Abadi",
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    foundingDate: "2015",
    telephone: PHONE,
    ...(jakartaOffice?.address && {
      address: {
        "@type": "PostalAddress",
        streetAddress: jakartaOffice.address,
        addressLocality: "Jakarta",
        addressCountry: "ID",
      },
    }),
  };

  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable} ${librebaskerville.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd).replace(/</g, "\\u003c") }}
        />
        <ScrollTopOnLoad />
        <LangProvider>
          {children}
          <FloatingConsult services={c.services} />
        </LangProvider>
      </body>
    </html>
  );
}