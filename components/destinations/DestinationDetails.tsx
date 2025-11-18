import {
  appStrings,
  ArrowLeftBlackSvg,
  ArrowRightSvg,
  destinations,
  images,
} from "@/service";
import BlurText from "../animation/BlurText";
import Link from "next/link";
import Image from "next/image";

function DestinationDetails() {
  const items = Array.from({ length: 15 }, (_, i) => i);
  return (
    <section
      className="py-10 md:py-16 lg:py-20 bg-white lg:min-h-screen flex items-center"
      id="destinations"
    >
      <div className="w-full">
        <div className="containerX">
          <div className="flex items-center gap-2 cursor-pointer w-max mb-6 md:mb-8 lg:mb-10">
            <ArrowLeftBlackSvg />
            <h2 className="backTitle text-text-950">
              <BlurText text="United States of America" translateY={[50, 0]} />
            </h2>
          </div>
          <div className="flex gap-8">
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
                    className="flex flex-col gap-4 cursor-pointer bg-natural-100 p-4 rounded-2xl w-full h-[140px]"
                  ></div>
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
