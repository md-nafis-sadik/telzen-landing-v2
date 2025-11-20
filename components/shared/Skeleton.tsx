"use client";
import { cn } from "@/service";
import React, { useRef } from "react";
// import { gsap } from "gsap";
// import { useGSAP } from "@gsap/react";
// import { cn } from "@/lib/utils";

type SkeletonProps = React.HTMLAttributes<HTMLDivElement> & {
  shimmerClassName?: string;
};

const Skeleton: React.FC<SkeletonProps> = ({
  className = "",
  shimmerClassName,
  ...rest
}) => {
  const shimmerRef = useRef<HTMLDivElement>(null);

  // useGSAP(() => {
  //   if (shimmerRef.current) {
  //     gsap.to(shimmerRef.current, {
  //       x: "200%",
  //       duration: 1.5,
  //       repeat: -1,
  //       ease: "linear",
  //     });
  //   }
  // }, []);

  return (
    <div
      className={cn("relative overflow-hidden bg-gray-200", className)}
      {...rest}
    >
      <div
        ref={shimmerRef}
        className={cn(
          "absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white to-transparent",
          shimmerClassName
        )}
      />
    </div>
  );
};

export default Skeleton;
