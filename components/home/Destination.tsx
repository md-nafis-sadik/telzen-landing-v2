import { appStrings, destinations } from "@/service";
import Image from "next/image";
import EmblaCarousel from "../shared/EmblaCarousel";

function Destination() {
  return (
    <section className="py-10 md:py-16 lg:py-20 bg-primary-black">
      <div className="containerX">
        <div className="w-full max-w-[728px] mx-auto text-center">
          <h2 className="title text-center tracking-[-2px] text-primary-500">
            {appStrings.findPopularDestination}
          </h2>
          <p className="text-lg md:text-2xl lg:text-3xs text-text-200 mt-4 md:mt-6">
            {appStrings.discoverOurMostPopularDesc}
          </p>
        </div>
      </div>
      <EmblaCarousel
        className="my-7 md:my-10 emblaPadding"
        options={{ align: "start", containScroll: "trimSnaps" }}
      >
        <div className="flex">
          {destinations.map((destination, index) => (
            <div
              key={index}
              className="w-56 min-w-56 md:w-[282px] md:min-w-[282px] h-64 md:h-[300px] p-6 rounded-3xl text-white ml-4 first:ml-0"
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
        {appStrings.pleaseCheckOurPrice}
      </p>
    </section>
  );
}

export default Destination;
