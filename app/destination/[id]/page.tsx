import DestinationDetails from "@/components/destinations/DestinationDetails";
import HowItWork from "@/components/home/HowItWork";
import WhyChoose from "@/components/home/WhyChoose";
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

function Destinations() {
  return (
    <main className="font-inter bg-white">
      <DestinationDetails />
      <HowItWork />
      <WhyChoose />
    </main>
  );
}

export default Destinations;
