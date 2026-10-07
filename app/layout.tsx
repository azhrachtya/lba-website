import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import LangProvider from "@/components/LangProvider";
import ScrollTopOnLoad from "@/components/ScrollTopOnLoad";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });

export const metadata: Metadata = {
  title: "PT Lautan Berlian Abadi — Integrated Logistics Solutions",
  description: "Freight forwarding, PPJK, sea & air freight, inland transportation, warehousing and project cargo across Indonesia.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body>
        <ScrollTopOnLoad />
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
