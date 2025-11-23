import CultureHero from "@/components/culture/CultureHero";
import OfficeImage from "@/components/culture/OfficeImage";
import ViewAbout from "@/components/culture/ViewAbout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Culture - Life at Telzen | Join Our Team",
  description: "Discover Telzen's company culture, values, and work environment. Learn what makes our team passionate about connecting the world through eSIM technology.",
  keywords: "Telzen culture, company culture, careers at Telzen, team values, work environment, eSIM innovation, tech company culture",
  openGraph: {
    title: "Our Culture - Life at Telzen | Join Our Team",
    description: "Discover Telzen's company culture, values, and work environment. Learn what makes our team passionate about connecting the world through eSIM technology.",
    url: "/culture",
  },
};

function Culture() {
  return (
    <main className="font-inter bg-white">
      <CultureHero />
      <section className="py-10 md:py-16 lg:py-20 bg-white">
        <div className="containerX text-center">
          <OfficeImage />
          <ViewAbout/>
        </div>
      </section>
    </main>
  );
}

export default Culture;
