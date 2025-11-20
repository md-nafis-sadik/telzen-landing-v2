import CultureHero from "@/components/culture/CultureHero";
import OfficeImage from "@/components/culture/OfficeImage";
import ViewAbout from "@/components/culture/ViewAbout";

function About() {
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

export default About;
