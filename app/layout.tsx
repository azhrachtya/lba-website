import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Montserrat, Comic_Neue, Kaushan_Script, Libre_Baskerville} from "next/font/google";
import "./globals.css";
import LangProvider from "@/components/LangProvider";
import ScrollTopOnLoad from "@/components/ScrollTopOnLoad";
import FloatingConsult from "@/components/FloatingConsult";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });
const letterFont = Montserrat({ subsets: ["latin"], weight: ["800"], variable: "--font-letter" });
const comicSans = Comic_Neue({ subsets: ["latin"], weight: ["700"], variable: "--font-comic-sans" });
const kaushanscript = Kaushan_Script({ subsets: ["latin"], weight: ["400"], variable: "--font-kaushanscript" });
const librebaskerville = Libre_Baskerville({ subsets: ["latin"], weight: ["400"], variable: "--font-libre-baskerville" });

export const metadata: Metadata = {
  title: "PT Lautan Berlian Abadi — Integrated Logistics Solutions",
  description: "Freight forwarding, PPJK, sea & air freight, inland transportation, warehousing and project cargo across Indonesia.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable} ${letterFont.variable} ${comicSans.variable} ${kaushanscript.variable} ${librebaskerville.variable}`}>
      <body>
        <ScrollTopOnLoad />
        <LangProvider>{children}
          <FloatingConsult />
        </LangProvider>
      </body>
    </html>
  );
}
