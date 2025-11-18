import { appStrings, ArrowRightSvg, destinations, images } from "@/service";
import Image from "next/image";
import BlurText from "../animation/BlurText";
import EmblaCarousel from "../shared/EmblaCarousel";
import Link from "next/link";

function Destination() {
  const items = Array.from({ length: 8 }, (_, i) => i);
  return (
    <section
      className="py-10 md:py-16 lg:py-20 bg-primary-black lg:min-h-screen flex items-center"
      id="destinations"
    >
      <div className="w-full">
        <div className="containerX">
          <div className="w-full max-w-[728px] mx-auto text-center">
            <h2 className="title text-center text-primary-500 overflow-hidden">
              <BlurText
                text={appStrings.destinations}
                translateY={[50, 0]}
                className="md:tracking-[-2px]"
              />
            </h2>
            <p className="text-lg md:text-2xl lg:text-3xs text-text-200 mt-2 md:mt-4 overflow-hidden">
              <BlurText
                delay={50}
                translateX={[-30, 0]}
                text={appStrings.discoverOurMostPopularDesc}
              />
            </p>
            <div className="bg-natural-200 w-max mx-auto rounded-full h-[52px] flex items-center mt-6 font-semibold">
              <div className="bg-primary-700 rounded-full px-6 py-2 h-full flex items-center text-text-50 z-10">
                <span>Countries</span>
              </div>
              <div className="bg-natural-200 rounded-full px-6 py-2 h-full flex items-center -ml-3">
                <span>Regional Packs</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-3 lg:gap-4 mt-6 md:mt-10 w-max mx-auto">
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
        {/* <EmblaCarousel
          className="my-7 md:my-10"
          options={{ containScroll: "trimSnaps", loop: true }}
          playOnInit={true}
        >
          <div className="flex">
            {destinations.map((destination) => (
              <div
                key={destination?.id}
                className="w-56 min-w-56 md:w-[282px] md:min-w-[282px] h-64 md:h-[300px] p-6 rounded-3xl text-white mx-2 select-none"
                style={{
                  backgroundColor: destination?.color,
                }}
              >
                <Image
                  src={destination?.image_url}
                  alt={destination?.name}
                  width={100}
                  height={100}
                  className="size-12 object-fill"
                />
                <h3 className="text-2xl md:text-3xl lg:text-5xl font-barlow font-bold md:font-black uppercase mt-3">
                  {destination.name}
                </h3>
                <p className="text-lg md:text-xl lg:text-2xl mt-1">
                  {destination.description}
                </p>
              </div>
            ))}
          </div>
        </EmblaCarousel>
        <p className="px-6 text-lg text-text-500 text-center">
          <BlurText
            translateX={[-30, 0]}
            delay={50}
            text={appStrings.pleaseCheckOurPrice}
          />
        </p> */}
      </div>
    </section>
  );
}

export default Destination;
