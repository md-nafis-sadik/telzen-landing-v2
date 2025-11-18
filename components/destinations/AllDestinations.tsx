import {
  appStrings,
  ArrowLeftBlackSvg,
  ArrowRightSvg,
  destinations,
  images,
} from "@/service";
import BlurText from "../animation/BlurText";
import Link from "next/link";

function AllDestinations() {
  const items = Array.from({ length: 15 }, (_, i) => i);
  return (
    <section
      className="py-10 md:py-16 lg:py-20 bg-white lg:min-h-screen flex items-center"
      id="destinations"
    >
      <div className="w-full">
        <div className="containerX">
          <div className="flex items-center gap-2 cursor-pointer w-max">
            <ArrowLeftBlackSvg />
            <h2 className="backTitle text-text-950">
              <BlurText text={appStrings.destinations} translateY={[50, 0]} />
            </h2>
          </div>
          <div className="w-full flex flex-col-reverse gap-4 lg:flex-row items-center justify-between my-6 md:my-8 lg:my-10">
            <div className="bg-natural-200 w-max rounded-full h-[52px] flex items-center font-semibold text-sm md:text-base">
              <div className="bg-primary-700 rounded-full px-6 py-2 h-full flex items-center text-text-50 z-10">
                <span>Countries</span>
              </div>
              <div className="bg-natural-200 rounded-full px-6 py-2 h-full flex items-center -ml-3">
                <span>Regional Packs</span>
              </div>
            </div>

            <div className="w-full max-w-[360px] px-2 lg:px-0">
              <div className="flex items-center border border-[#8C8C8C] rounded-full overflow-hidden h-13 bg-white">
                <input
                  type="text"
                  placeholder="Your destination"
                  className="flex-1 pl-6 text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
                />

                <button className="bg-[#00CD8E] text-white text-sm lg:text-base font-medium px-5 py-[7px] h-max rounded-full m-2">
                  Search
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 md:gap-3 lg:gap-4 mt-6 md:mt-10 w-max mx-auto">
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

export default AllDestinations;
