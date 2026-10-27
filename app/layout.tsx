import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Libre_Baskerville} from "next/font/google";
import "./globals.css";
import LangProvider from "@/components/LangProvider";
import ScrollTopOnLoad from "@/components/ScrollTopOnLoad";
import FloatingConsult from "@/components/FloatingConsult";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });
const librebaskerville = Libre_Baskerville({ subsets: ["latin"], weight: ["400"], variable: "--font-libre-baskerville" });

export const metadata = {
  title: "PT Lautan Berlian Abadi | Project Cargo & Freight Forwarding Indonesia",
  description: "Spesialis Project Cargo, PPJK Customs, Sea Freight ke Indonesia Timur sejak 2015",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable} ${librebaskerville.variable}`}>
      <body>
        <ScrollTopOnLoad />
        <LangProvider>{children}
          <FloatingConsult />
        </LangProvider>
      </body>
    </html>
  );
}
