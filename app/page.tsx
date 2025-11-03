import Destination from "@/components/home/Destination";
import Hero from "@/components/home/Hero";
import HowItWork from "@/components/home/HowItWork";
import Nationwide from "@/components/home/Nationwide";
import WhyChoose from "@/components/home/WhyChoose";
import Faq from "@/components/shared/Faq";

function page() {
  return (
    <main className="font-inter bg-white">
      <Hero />
      <Destination />
      <HowItWork />
      <WhyChoose />
      <Nationwide />
      <Faq />
    </main>
  );
}

export default page;
