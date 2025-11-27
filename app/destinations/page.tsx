import AllDestinationsContainer from "@/components/destinations/AllDestinationsContainer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Destinations - Telzen eSIM",
  description: "Browse our extensive collection of eSIM plans for countries and regions worldwide. Find affordable data plans for your next travel destination with Telzen.",
  keywords: "eSIM destinations, travel eSIM plans, international data, country eSIM, regional eSIM, Telzen destinations",
  openGraph: {
    title: "Explore Destinations - Telzen eSIM",
    description: "Browse our extensive collection of eSIM plans for countries and regions worldwide. Find affordable data plans for your next travel destination with Telzen.",
    url: "/destinations",
  },
};

function Destinations() {
  return (
    <main className="font-inter bg-white">
      <AllDestinationsContainer />
    </main>
  );
}

export default Destinations;
