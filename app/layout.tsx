import Footer from "@/components/navigations/Footer";
import Header from "@/components/navigations/Header";
import LenisLayout from "@/components/shared/LenisLayout";
import Loader from "@/components/shared/Loader";
import type { Metadata } from "next";
import { Barlow_Condensed, Inter_Tight } from "next/font/google";
import "./globals.css";

const inter = Inter_Tight({
  weight: ["400", "500", "600", "700", "900"],
  subsets: ["latin"],
  variable: "--font-inter-tight",
});

const barlow = Barlow_Condensed({
  weight: ["400", "500", "600", "700", "900"],
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
});

// telzen is for esim service over the world
export const metadata: Metadata = {
  title: "Telzen - eSIM for Everyone, Everywhere",
  description:
    "Experience seamless global connectivity with Telzen's eSIM solutions. Stay connected wherever you go with our easy-to-use, reliable, and affordable eSIM plans designed for travelers worldwide.",
  keywords:
    "eSIM, global connectivity, travel eSIM, Telzen, mobile data, international SIM, eSIM plans, travel technology, digital SIM, worldwide coverage",
  authors: [{ name: "Telzen", url: "https://telzen.com" }],
  creator: "Telzen",
  publisher: "Telzen",
  applicationName: "Telzen",
  metadataBase: new URL("https://telzen.com"),
  openGraph: {
    title: "Telzen - eSIM for Everyone, Everywhere",
    description:
      "Experience seamless global connectivity with Telzen's eSIM solutions. Stay connected wherever you go with our easy-to-use, reliable, and affordable eSIM plans designed for travelers worldwide.",
    url: new URL("https://telzen.com"),
    siteName: "Telzen",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Telzen eSIM - Seamless Global Connectivity",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Telzen - eSIM for Everyone, Everywhere",
    description:
      "Experience seamless global connectivity with Telzen's eSIM solutions. Stay connected wherever you go with our easy-to-use, reliable, and affordable eSIM plans designed for travelers worldwide.",
    images: ["/images/og-image.png"],
  },
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
        <LenisLayout>{children}</LenisLayout>
        <Footer />
        <Loader />
      </body>
    </html>
  );
}
