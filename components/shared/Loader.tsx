"use client";
import { cn, images } from "@/service";
import Image from "next/image";
import { useEffect, useState } from "react";

function Loader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide loader after a short delay or when page loads, whichever comes first
    const timer = setTimeout(() => setLoading(false), 90);
    
    const handleLoad = () => {
      setLoading(false);
      clearTimeout(timer);
    };

    if (document.readyState === "complete") {
      setLoading(false);
      clearTimeout(timer);
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
      clearTimeout(timer);
    };
  }, []);

  if (!loading) return null;

  return (
    <div
      className={cn(
        "w-full h-screen overflow-hidden flex flex-col gap-6 items-center justify-center bg-white z-[999] fixed top-0 left-0"
      )}
    >
      <Image
        src={images.logo}
        alt="logo"
        width={300}
        height={300}
        className="w-48"
        priority
        sizes="192px"
      />
    </div>
  );
}

export default Loader;
