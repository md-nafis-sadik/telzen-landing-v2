import CustomerSaid from "@/components/home/CustomerSaid";
import Destination from "@/components/home/Destination";
import Download from "@/components/home/Download";
import Hero from "@/components/home/Hero";
import HowItWork from "@/components/home/HowItWork";
import Nationwide from "@/components/home/Nationwide";
import Refer from "@/components/home/Refer";
import WhyChoose from "@/components/home/WhyChoose";
import Faq from "@/components/shared/Faq";

function Home() {
  return (
    <main className="font-inter bg-white">
      <Hero />
      <Destination />
      <HowItWork />
      <WhyChoose />
      <Nationwide />
      <Refer />
      <CustomerSaid />
      <Download />
      <Faq />
    </main>
  );
}

export default Home;
