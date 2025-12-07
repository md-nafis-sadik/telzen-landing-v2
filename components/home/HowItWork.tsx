import { appStrings, workSteps } from "@/service";
import Image from "next/image";
import { memo } from "react";
import AnimateCard from "../animation/AnimateCard";
import BlurText from "../animation/BlurText";

function HowItWork() {
  return (
    <section className="pt-10 pb-4 md:pt-16 md:pb-10 lg:pt-6 bg-red-900 lg:min-h-screen flex items-center justify-center" id="howItWorks">
      <div className="containerX">
        <h2 className="title text-center text-red-700">
          <BlurText
            text={appStrings.howItWorks}
            translateY={[50, 0]}
            className="md:tracking-[-2px]"
          />
        </h2>
        <div className="grid sm:grid-cols-2 gap-4 md:gap-6 mt-8 md:mt-12 lg:mt-16 pb-6">
          {workSteps.map((step, index) => (
            <AnimateCard
              key={step?.id}
              translateX={[50, 0]}
              delay={index * 100}
            >
              <div className="w-full h-full bg-white rounded-3xl px-6 md:px-8 lg:px-10 py-4 md:py-6 hover:scale-[1.015] duration-200">
                <Image
                  src={step?.icon}
                  className="size-20"
                  width={100}
                  height={100}
                  alt={step?.title}
                  loading="lazy"
                  sizes="80px"
                />
                <h3 className="mt-6 md:mt-8 lg:mt-10 text-3xl md:text-4xl lg:text-5xl font-bold lg:font-black font-barlow text-text-950">
                  {step?.title}
                </h3>
                <p className="text-lg md:text-xl lg:text-2xl mt-2 lg:mt-4">
                  {step?.description}
                </p>
              </div>
            </AnimateCard>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(HowItWork);
