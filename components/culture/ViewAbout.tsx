"use client";

import { aboutViewData, cn } from "@/service";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const ViewAbout = ({ reverse }: { reverse?: boolean }) => {
  const options = {
    align: "center",
    loop: true,
    slidesToScroll: 1,
  } as const;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ delay: 3000, stopOnInteraction: false }),
  ]);

  const containerRef = useRef<HTMLDivElement>(null);
  const isInitializedRef = useRef(false);
  const [isReady, setIsReady] = useState(false);

  const [selectedIndex, setSelectedIndex] = useState<number>(1);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!isInitializedRef.current) {
      window.scrollTo(0, 0);

      const readyTimer = setTimeout(() => {
        setIsReady(true);
        isInitializedRef.current = true;
      }, 100);

      return () => clearTimeout(readyTimer);
    }
  }, []);

  return (
    <section
      ref={containerRef}
      className={cn(
        "containerX overflow-hidden w-full flex",
        reverse ? "flex-col-reverse" : "flex-col"
      )}
    >
      <div className="mx-auto w-full mt-6 md:mt-10 mb-10 md:mb-0 h-[234px] min-h-[234px] md:h-[544px] md:min-h-[544px] lg:h-[660px] lg:min-h-[660px] overflow-hidden">
        <div className="w-full" ref={emblaRef}>
          <div className="flex flex-row items-center gap-4 sm:gap-6 pt-10">
            {aboutViewData.map(({ image, title, description }, index) => (
              <div
                className="flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_33.333%] px-2"
                key={index}
              >
                <div
                  className={cn(
                    "relative overflow-hidden transition-all duration-300 ease-out",
                    selectedIndex === index
                      ? "h-[234px] md:h-[544px]"
                      : "h-[186px] md:h-[434px]",
                    index === aboutViewData.length - 1 && "me-4 md:me-6"
                  )}
                  style={{
                    transform:
                      selectedIndex === index ? "scale(1.1)" : "scale(1)",
                  }}
                >
                  <Image
                    src={image}
                    alt={title}
                    aria-label={description}
                    width={1280}
                    height={1280}
                    className="min-h-full h-full min-w-full w-auto object-cover absolute_center"
                    priority={index === 0} // Add priority to first image for faster loading
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ViewAbout;
