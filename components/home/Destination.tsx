import { appStrings, destinations } from "@/service";
import Image from "next/image";
import BlurText from "../animation/BlurText";
import EmblaCarousel from "../shared/EmblaCarousel";

function Destination() {
  return (
    <section
      className="py-10 md:py-16 lg:py-6 bg-primary-black lg:min-h-screen flex items-center"
      id="destinations"
    >
      <div className="w-full">
        <div className="containerX">
          <div className="w-full max-w-[728px] mx-auto text-center">
            <h2 className="title text-center text-primary-500 overflow-hidden">
              <BlurText
                text={appStrings.findPopularDestination}
                translateY={[50, 0]}
                className="tracking-[-2px]"
              />
            </h2>
            <p className="text-lg md:text-2xl lg:text-3xs text-text-200 mt-4 md:mt-6">
              <BlurText
                delay={50}
                text={appStrings.discoverOurMostPopularDesc}
              />
            </p>
          </div>
        </div>
        <EmblaCarousel
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
          <BlurText delay={50} text={appStrings.pleaseCheckOurPrice} />
        </p>
      </div>
    </section>
  );
}

export default Destination;
