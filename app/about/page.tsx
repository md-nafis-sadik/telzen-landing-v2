import AboutUs from "@/components/about/AboutUs";
import OurMission from "@/components/about/OurMission";
import OurVision from "@/components/about/OurVision";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Telzen eSIM | Connecting the World",
  description: "Learn about Telzen's mission to provide seamless global connectivity through innovative eSIM solutions. Discover our vision for the future of travel technology.",
  keywords: "about Telzen, eSIM company, global connectivity, travel technology, digital nomad, international roaming, mobile innovation",
  openGraph: {
    title: "About Us - Telzen eSIM | Connecting the World",
    description: "Learn about Telzen's mission to provide seamless global connectivity through innovative eSIM solutions. Discover our vision for the future of travel technology.",
    url: "/about",
  },
};

function About() {
  return (
    <main className="font-inter bg-white">
      <AboutUs />
      <OurMission />
      <OurVision />
    </main>
  );
}

export default About;
