"use client";
import { cn } from "@/service";
import Autoplay from "embla-carousel-autoplay";
import ClassNames from "embla-carousel-class-names";
import useEmblaCarousel from "embla-carousel-react";

function EmblaCarousel({
  className,
  options = {},
  plugin = [],
  playOnInit = false,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
  options?: Record<string, any>;
  playOnInit?: boolean;
  plugin?: any[];
}) {
  const [emblaRef] = useEmblaCarousel(options, [
    ClassNames({ snapped: "is-snapped" }),
    Autoplay({ playOnInit: playOnInit, delay: 3000 }),
    ...plugin,
  ]);
  return (
    <div className={cn("relative overflow-hidden", className)} ref={emblaRef}>
      {children}
    </div>
  );
}

export default EmblaCarousel;
