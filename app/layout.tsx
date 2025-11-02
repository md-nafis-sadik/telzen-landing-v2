import Footer from "@/components/navigations/Footer";
import Header from "@/components/navigations/Header";
import type { Metadata } from "next";
import { Barlow_Condensed, Inter_Tight } from "next/font/google";
import "./globals.css";

const inter = Inter_Tight({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-inter-tight",
});

const barlow = Barlow_Condensed({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
});

export const metadata: Metadata = {
  title: "Telzen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${barlow.variable} antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
