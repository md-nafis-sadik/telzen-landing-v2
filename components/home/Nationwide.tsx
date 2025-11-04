import { appStrings, images } from "@/service";
import Image from "next/image";
import BlurText from "../animation/BlurText";

function Nationwide() {
  return (
    <section className="py-10 md:py-16 lg:py-20 bg-primary-black">
      <div className="containerX !max-w-[1030px] text-center">
        <Image
          src={images.house}
          width={300}
          height={300}
          className="size-48 md:size-56 lg:size-72 object-contain mx-auto"
          alt="opera house"
        />
        <h2 className="title text-primary-500 mb-6 md:mb-8 lg:mb-10 overflow-hidden">
          <BlurText
            text={appStrings.nationwideCoverage}
            translateY={[50, 0]}
            className="tracking-[-2px]"
          />
        </h2>
        <p className="text-xl md:text-2xl lg:text-[32px] leading-[125%] text-text-100 max-w-[712px] mx-auto">
          <BlurText text={appStrings.globalConnectivityDesc} delay={100} />
        </p>
      </div>
    </section>
  );
}

export default Nationwide;
