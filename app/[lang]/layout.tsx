import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { siteCss } from "@/lib/site-css.generated";
import LangProvider from "@/components/LangProvider";
import ScrollTopOnLoad from "@/components/ScrollTopOnLoad";
import FloatingConsult from "@/components/FloatingConsult";
import { getContent } from "@/lib/queries";
import { defaultOffices } from "@/lib/defaults";
import type { Lang } from "@/lib/i18n";
import { LOCALES, SITE_URL, SITE_NAME, SOCIAL_IMAGE, isLang, siteMeta } from "@/lib/seo";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

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
      siteName: SITE_NAME,
      type: "website",
      locale: m.locale,
      images: [SOCIAL_IMAGE],
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
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo-336.webp`,
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
    <html lang={lang}>
      <head>
        <style id="lba-site-css" dangerouslySetInnerHTML={{ __html: siteCss }} />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd).replace(/</g, "\\u003c") }}
        />
        {GA_ID && /^G-[A-Z0-9]+$/.test(GA_ID) && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="lba-google-analytics" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');`}
            </Script>
          </>
        )}
        <ScrollTopOnLoad />
        <LangProvider lang={lang}>
          {children}
          <FloatingConsult services={c.services.map(({ title }: { title: any }) => ({ title }))} />
        </LangProvider>
      </body>
    </html>
  );
}