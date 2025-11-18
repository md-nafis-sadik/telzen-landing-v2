import { appStrings, ArrowRightSvg, images } from "@/service";
import BlurText from "../animation/BlurText";
import Link from "next/link";

function RecomendedDestinations() {
  const items = Array.from({ length: 4 }, (_, i) => i);
  return (
    <section
      className="py-10 md:py-16 lg:py-20 bg-white flex items-center"
      id="recomendedDestinations"
    >
      <div className="w-full">
        <div className="containerX">
          <div className="w-full max-w-[728px] mx-auto text-center">
            <h2 className="title text-center text-primary-700 overflow-hidden">
              <BlurText
                text={appStrings.recomended}
                translateY={[50, 0]}
                className="md:tracking-[-2px]"
              />
            </h2>
            <p className="text-lg md:text-2xl lg:text-3xs text-text-700 mt-2 md:mt-4 overflow-hidden">
              <BlurText
                delay={50}
                translateX={[-30, 0]}
                text={appStrings.basedOnPublicDemand}
              />
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 lg:gap-4 mt-6 md:mt-10 w-max mx-auto">
            {items.map((item, index) => (
              <div
                key={index}
                className="relative rounded-[12.698px] w-[250.794px] h-[300px] overflow-hidden cursor-pointer"
                style={{
                  backgroundImage: `url(${images?.newZealand})`,
                  backgroundPosition: "-12.584px -58.73px",
                  backgroundSize: "111.347% 119.577%",
                  backgroundRepeat: "no-repeat",
                  backgroundColor: "lightgray",
                }}
              >
                <div
                  className="absolute bottom-0 w-full rounded-b-[12.698px]"
                  style={{
                    height: "177.778px",
                    background:
                      "linear-gradient(0deg, #042855 0%, rgba(4, 40, 85, 0) 100%)",
                  }}
                ></div>

                <div
                  className={`
                  sticker absolute bottom-2 left-1/2 -translate-x-1/2 
                  w-[95%] max-w-[238px] rounded-[9px] px-3 sm:px-[12.7px] pt-1 pb-2
                  ${index % 2 === 0 ? "bg-primary-700" : "bg-secondary-200"}
                `}
                >
                  <div className="text-2xl sm:text-[32px] font-extrabold font-barlow uppercase text-[#FAFAFA] leading-tight">
                    New Zealand
                  </div>
                  <div className="text-base sm:text-lg text-[#FAFAFA]">
                    Start from $9.99
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <Link
              href="/destinations"
              className="flex justify-center items-center text-text-50 gap-2 mt-6 lg:mt-10"
            >
              <span>See more</span>
              <ArrowRightSvg />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RecomendedDestinations;
