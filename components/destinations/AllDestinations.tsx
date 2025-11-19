import {
  appStrings,
  ArrowLeftBlackSvg,
  ArrowRightSvg,
  destinations,
  images,
} from "@/service";
import BlurText from "../animation/BlurText";
import Link from "next/link";
import HeaderPrev from "../shared/HeaderPrev";
import SearchInput from "../shared/SearchInput";
import BigToggleSwitch from "../shared/BigToggleSwitch";
import DestinationCard from "../shared/DestinationCard";

function AllDestinations() {
  const items = Array.from({ length: 15 }, (_, i) => i);
  return (
    <section
      className="py-10 md:py-16 lg:py-20 bg-white lg:min-h-screen flex"
      id="allDestinations"
    >
      <div className="w-full">
        <div className="containerX">
          <HeaderPrev text={appStrings.destinations} />
          <div className="w-full flex flex-col gap-4 sm:flex-row items-center justify-between my-6 md:my-8 lg:my-10">
            <BigToggleSwitch />

            <div className="w-full max-w-[360px] px-2 lg:px-0">
              <SearchInput placeholder="Your destination" />
            </div>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 md:gap-3 lg:gap-4 mt-6 md:mt-10 w-full mx-auto
"
          >
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

export default AllDestinations;
