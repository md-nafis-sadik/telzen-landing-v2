"use client";
import { cn, images } from "@/service";
import Image from "next/image";
import { useEffect, useState } from "react";
import InfiniteBlurCard from "../animation/InfiniteBlurCard";

function Loader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This runs when the page has fully loaded
    const handleLoad = () => setLoading(false);

    // Listen for window load event
    if (document.readyState === "complete") {
      setLoading(false);
    } else {
      window.addEventListener("load", handleLoad);
    }

    // Clean up listener
    return () => window.removeEventListener("load", handleLoad);
  }, []);

  return (
    loading && (
      <div
        className={cn(
          "w-full h-screen overflow-hidden flex flex-col gap-6 items-center justify-center bg-white z-[999] fixed top-0 left-0"
        )}
      >
        <InfiniteBlurCard
          yoyoTransition={{
            duration: 0.7,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        >
          <Image
            src={images.logo}
            alt="logo"
            width={300}
            height={300}
            className="w-48"
            priority
          />
        </InfiniteBlurCard>
      </div>
    )
  );
}

export default Loader;
