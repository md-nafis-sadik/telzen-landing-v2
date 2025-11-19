import { appStrings, ArrowRightSvg, images } from "@/service";
import BlurText from "../animation/BlurText";
import Link from "next/link";
import DestinationCard from "../shared/DestinationCard";

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

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-3 lg:gap-4 mt-6 md:mt-10 w-full mx-auto">
            {items.map((item, index) => (
              <DestinationCard key={index} index={index} />
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
