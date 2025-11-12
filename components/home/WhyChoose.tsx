import { appStrings, images } from "@/service";
import Image from "next/image";
import BlurCard from "../animation/BlurCard";
import BlurText from "../animation/BlurText";
import WhyChooseAccordion from "./WhyChooseAccordion";

function WhyChoose() {
  return (
    <section className="py-10 md:py-16 lg:py-20 bg-secondary-300">
      <div className="containerX">
        <div className="flex flex-col lg:flex-row items-center gap-10 bg-white p-6 md:p-8 lg:p-12 rounded-3xl">
          <div className="w-full lg:min-w-96 max-w-[580px] mx-auto md:mx-left text-center lg:text-left">
            <BlurCard scale={[1.1, 1]}>
              <Image
                src={images.pyramid}
                alt="pyramid"
                width={300}
                height={300}
                className="size-60 mx-auto lg:mx-0"
              />
            </BlurCard>
            <h2 className="title text-text-950 my-4 md:my-6 overflow-hidden">
              <BlurText
                text={appStrings.whyChooseTelzen}
                translateX={[-50, 0]}
                className="md:tracking-[-2px]"
              />
            </h2>
            <p className="text-2xl text-text-700 overflow-hidden">
              <BlurText
                text={appStrings.whySimly}
                translateY={[30, 0]}
                delay={50}
              />
            </p>
          </div>
          <WhyChooseAccordion />
        </div>
      </div>
    </section>
  );
}

export default WhyChoose;
