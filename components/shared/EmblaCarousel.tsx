"use client";
import { cn } from "@/service";
import useEmblaCarousel from "embla-carousel-react";

function EmblaCarousel({
  className,
  options = {},
  children,
}: {
  className?: string;
  children?: React.ReactNode;
  options?: Record<string, any>;
}) {
  const [emblaRef] = useEmblaCarousel(options);
  return (
    <div className={cn("relative overflow-hidden", className)} ref={emblaRef}>
      {children}
    </div>
  );
}

export default EmblaCarousel;
