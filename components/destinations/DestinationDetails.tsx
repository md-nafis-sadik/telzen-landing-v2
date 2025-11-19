import {
  appStrings,
  ArrowLeftBlackSvg,
  ArrowRightSvg,
  destinations,
  images,
  SmileGreenSvg,
  StarPointSvg,
} from "@/service";
import BlurText from "../animation/BlurText";
import Link from "next/link";
import Image from "next/image";

function DestinationDetails() {
  const items = Array.from({ length: 15 }, (_, i) => i);
  return (
    <section
      className="py-10 md:py-16 lg:py-20 bg-white lg:min-h-screen flex"
      id="destinationDetails"
    >
      <div className="w-full">
        <div className="containerX">
          <div className="flex items-center gap-2 cursor-pointer w-max mb-6 md:mb-8 lg:mb-10">
            <ArrowLeftBlackSvg />
            <h2 className="backTitle text-text-950">
              <BlurText text="United States of America" translateY={[50, 0]} />
            </h2>
          </div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex h-full">
              <Image
                src={images?.newZealand}
                alt="world"
                width={386}
                height={460}
                priority
                className="rounded-3xl"
              />
            </div>
            <div className="w-full">
              <span className="backTitle text-primary-700">
                <BlurText
                  text="Packages"
                  translateY={[50, 0]}
                  className=" text-[32px]"
                />
              </span>

              <p className="text-text-700 mt-2 mb-6 max-w-lg tracking-tight text-sm md:text-base">
                Here is the list of packages. You can see details upon selecting
                a package.
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {destinations.map((destination, index) => (
                  <div
                    key={index}
                    className="flex gap-3 cursor-pointer bg-text-100 p-4 rounded-2xl w-full"
                  >
                    <div className="flex flex-col w-full gap-3">
                      <span>
                        <SmileGreenSvg className="w-6 md:w-7 lg:w-8 h-6 md:h-7 lg:h-8" />
                      </span>
                      <div className="flex flex-col gap-1">
                        <div className="text-lg md:text-xl lg:text-2xl">1 GB • 7 Days </div>
                        <div className="flex items-center gap-1">
                          <span>
                            <StarPointSvg className="w-4 md:w-5 lg:w-6 h-4 md:h-5 lg:h-6" />
                          </span>
                          <span className="text-natural-500 text-sm md:text-base">50 Points</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-end">
                      <div className="text-xl md:text-2xl lg:text-3xl justify-end">$8.99</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DestinationDetails;
