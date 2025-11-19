import { appStrings, images } from "@/service";
import Image from "next/image";
import BlurCard from "../animation/BlurCard";
import BlurText from "../animation/BlurText";

function AboutUs() {
  return (
    <section className="py-10 md:py-16 lg:py-20 bg-white">
      <div className="containerX text-center">
        <h2 className="title text-primary-700 mb-6 md:mb-8 lg:mb-10 overflow-hidden">
          <BlurText
            text={appStrings.aboutUs}
            translateY={[50, 0]}
            className="md:tracking-[-2px]"
          />
        </h2>
        <div className="flex flex-col gap-4 md:gap-6 lg:gap-8">
          <p className="text-xl md:text-2xl lg:text-[32px] leading-[125%] text-text-950 max-w-[1030px] mx-auto">
            <BlurText
              translateX={[30, 0]}
              delay={50}
              text={appStrings.about1}
            />
          </p>
          <p className="text-xl md:text-2xl lg:text-[32px] leading-[125%] text-text-950 max-w-[1030px] mx-auto">
            <BlurText
              translateX={[30, 0]}
              delay={50}
              text={appStrings.about2}
            />
          </p>
          <p className="text-xl md:text-2xl lg:text-[32px] leading-[125%] text-text-950 max-w-[1030px] mx-auto">
            <BlurText
              translateX={[30, 0]}
              delay={50}
              text={appStrings.about3}
            />
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
