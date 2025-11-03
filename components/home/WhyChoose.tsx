import { appStrings, images } from "@/service";
import Image from "next/image";
import WhyChooseAccordion from "./WhyChooseAccordion";

function WhyChoose() {
  return (
    <section className="py-10 md:py-16 lg:py-20 bg-secondary-300">
      <div className="containerX">
        <div className="flex flex-col lg:flex-row items-center gap-10 bg-white p-6 md:p-8 lg:p-12 rounded-3xl">
          <div className="w-full lg:min-w-96 max-w-[560px] mx-auto md:mx-left text-center lg:text-left">
            <Image
              src={images.pyramid}
              alt="pyramid"
              width={300}
              height={300}
              className="size-60 mx-auto lg:mx-0"
            />
            <h2 className="title tracking-[-2px] text-text-950 my-4 md:my-6">
              {appStrings.whyChooseTelzen}
            </h2>
            <p className="text-2xl text-text-700">{appStrings.whySimly}</p>
          </div>
          <WhyChooseAccordion />
        </div>
      </div>
    </section>
  );
}

export default WhyChoose;
