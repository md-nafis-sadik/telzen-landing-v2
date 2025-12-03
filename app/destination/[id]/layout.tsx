import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "eSIM Plans - Affordable Data for Your Destination | Telzen",
  description: "Discover affordable eSIM data plans for your travel destination. Instant activation, reliable connectivity, and competitive prices with Telzen.",
  keywords: "eSIM plans, destination eSIM, travel data plans, instant activation, affordable eSIM, international data",
  openGraph: {
    title: "eSIM Plans - Affordable Data for Your Destination | Telzen",
    description: "Discover affordable eSIM data plans for your travel destination. Instant activation, reliable connectivity, and competitive prices with Telzen.",
  },
};

export default function DestinationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
