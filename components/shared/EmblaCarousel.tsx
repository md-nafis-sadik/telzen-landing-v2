"use client";
import { cn } from "@/service";
import ClassNames from "embla-carousel-class-names";
import useEmblaCarousel from "embla-carousel-react";

function EmblaCarousel({
  className,
  options = {},
  dependencies = [],
  children,
}: {
  className?: string;
  children?: React.ReactNode;
  options?: Record<string, any>;
  dependencies?: any[];
}) {
  const [emblaRef] = useEmblaCarousel(options, [
    ClassNames({ snapped: "is-snapped" }),
    ...dependencies,
  ]);
  return (
    <div className={cn("relative overflow-hidden", className)} ref={emblaRef}>
      {children}
    </div>
  );
}

export default EmblaCarousel;
