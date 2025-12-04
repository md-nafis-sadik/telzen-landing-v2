"use client";

import DestinationDetails from "@/components/destinations/DestinationDetails";
import HowItWork from "@/components/home/HowItWork";
import WhyChoose from "@/components/home/WhyChoose";

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
