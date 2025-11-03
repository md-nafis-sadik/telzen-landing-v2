import { appStrings, workSteps } from "@/service";
import Image from "next/image";

function HowItWork() {
  return (
    <section className="py-10 md:py-16 lg:py-20 bg-red-900">
      <div className="containerX">
        <h2 className="title text-center tracking-[-2px] text-red-700">
          {appStrings.howItWorks}
        </h2>
        <div className="grid sm:grid-cols-2 gap-4 md:gap-6 mt-8 md:mt-12 lg:mt-16">
          {workSteps.map((step) => (
            <div
              key={step?.id}
              className="w-full bg-white rounded-3xl px-6 md:px-8 lg:px-10 py-4 md:py-6"
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWork;
