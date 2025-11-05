import { appStrings, workSteps } from "@/service";
import Image from "next/image";
import BlurCard from "../animation/BlurCard";
import BlurText from "../animation/BlurText";

function HowItWork() {
  return (
    <section className="pt-10 pb-4 md:pt-16 md:pb-10 lg:pt-6 bg-red-900 lg:min-h-screen flex items-center justify-center">
      <div className="containerX">
        <h2 className="title text-center text-red-700 overflow-hidden">
          <BlurText
            text={appStrings.howItWorks}
            translateY={[50, 0]}
            className="tracking-[-2px]"
          />
        </h2>
        <div className="grid sm:grid-cols-2 gap-4 md:gap-6 mt-8 md:mt-12 lg:mt-16 pb-6">
          {workSteps.map((step, index) => (
            <BlurCard
              key={step?.id}
              className="w-full bg-white rounded-3xl px-6 md:px-8 lg:px-10 py-4 md:py-6 hover:scale-[1.015] duration-300"
              translateX={[-50, 0]}
              delay={index * 100}
            >
              <Image
                src={step?.icon}
                className="size-20"
                width={100}
                height={100}
                alt={step?.title}
              />
              <h3 className="mt-6 md:mt-8 lg:mt-10 text-3xl md:text-4xl lg:text-5xl font-bold lg:font-black font-barlow text-text-950">
                {step?.title}
              </h3>
              <p className="text-lg md:text-xl lg:text-2xl mt-2 lg:mt-4">
                {step?.description}
              </p>
              {/* <h3 className="mt-6 md:mt-8 lg:mt-10 text-3xl md:text-4xl lg:text-5xl font-bold lg:font-black font-barlow text-text-950 overflow-hidden">
                <BlurText
                  delay={100}
                  text={step?.title}
                  translateX={[-50, 0]}
                />
              </h3>
              <p className="text-lg md:text-xl lg:text-2xl mt-2 lg:mt-4">
                <BlurText delay={100} text={step?.description} />
              </p> */}
            </BlurCard>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWork;
