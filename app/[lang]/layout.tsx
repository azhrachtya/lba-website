import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter, Plus_Jakarta_Sans, Libre_Baskerville } from "next/font/google";
import "../globals.css";
import LangProvider from "@/components/LangProvider";
import ScrollTopOnLoad from "@/components/ScrollTopOnLoad";
import FloatingConsult from "@/components/FloatingConsult";
import { getContent } from "@/lib/queries";
import { defaultOffices } from "@/lib/defaults";
import type { Lang } from "@/lib/i18n";
import { LOCALES, SITE_URL, isLang, siteMeta } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });
const librebaskerville = Libre_Baskerville({ subsets: ["latin"], weight: ["400"], variable: "--font-libre-baskerville" });

const PHONE = "+6281219769494"; // samakan dengan nomor di bagian Contact

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  if (!isLang(params.lang)) return {};
  const m = siteMeta[params.lang];
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: m.title, template: "%s | PT Lautan Berlian Abadi" },
    description: m.description,
    openGraph: {
      title: "PT Lautan Berlian Abadi",
      description: m.description,
      siteName: "PT Lautan Berlian Abadi",
      type: "website",
      locale: m.locale,
      images: [{ url: "/images/og.jpeg", width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  if (!isLang(params.lang)) notFound();
  const lang = params.lang as Lang;
  const c = await getContent();

  const offices: any[] = c.offices?.length ? c.offices : defaultOffices;
  const jakartaOffice = offices.find((o) => o?.city?.en?.toLowerCase().includes("jakarta"));

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PT Lautan Berlian Abadi",
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.webp`,
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
    <html lang={lang} className={`${inter.variable} ${jakarta.variable} ${librebaskerville.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd).replace(/</g, "\\u003c") }}
        />
        <ScrollTopOnLoad />
        <LangProvider lang={lang}>
          {children}
          <FloatingConsult services={c.services} />
        </LangProvider>
      </body>
    </html>
  );
}