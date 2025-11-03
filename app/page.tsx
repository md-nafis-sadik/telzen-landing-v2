import Destination from "@/components/home/Destination";
import Hero from "@/components/home/Hero";
import Faq from "@/components/shared/Faq";

function page() {
  return (
    <main className="font-inter bg-white">
      <Hero />
      <Destination />
      <Faq />
    </main>
  );
}

export default page;
