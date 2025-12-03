"use client";

import DestinationDetails from "@/components/destinations/DestinationDetails";
import HowItWork from "@/components/home/HowItWork";
import WhyChoose from "@/components/home/WhyChoose";
import { useEffect } from "react";

function Destinations() {
  useEffect(() => {
    // Force scroll to top on mount
    window.scrollTo(0, 0);
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, []);

  return (
    <main className="font-inter bg-white">
      <DestinationDetails />
      <HowItWork />
      <WhyChoose />
    </main>
  );
}

export default Destinations;
