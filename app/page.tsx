import Destination from "@/components/home/Destination";
import Hero from "@/components/home/Hero";
import HowItWork from "@/components/home/HowItWork";
import Faq from "@/components/shared/Faq";

function page() {
  return (
    <main className="font-inter bg-white">
      <Hero />
      <Destination />
      <HowItWork />
      <Faq />
    </main>
  );
}

export default page;
