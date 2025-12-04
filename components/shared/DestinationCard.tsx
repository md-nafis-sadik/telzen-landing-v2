"use client";

import { cn, images, appStrings } from "@/service";
import { Region, Country } from "@/store/modules/destination/destinationApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

interface DestinationCardProps {
  buttonText?: string;
  className?: string;
  index?: number;
  destinationImage?: string;
  destinationName?: string;
  destinationPriceSymbol?: string;
  destinationPrice?: string;
  onClick?: () => void;
  data?: Region | Country;
  isRegional?: boolean;
}

function DestinationCard({
  buttonText = appStrings.clickMe,
  className = "",
  index = 0,
  destinationImage,
  destinationName,
  destinationPriceSymbol = "$",
  destinationPrice,
  onClick,
  data,
  isRegional = false,
  ...props
}: DestinationCardProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const hasPrefetched = useRef(false);

  // Use data from API if available, otherwise fallback to props
  const displayImage = data?.image || destinationImage || images?.newZealand;
  const displayName = data?.name || destinationName || appStrings.newZealand;
  const displayPrice = data?.start_from || destinationPrice || 0;

  // Encode the image URL to handle spaces and special characters
  const encodedImageUrl = displayImage ? encodeURI(displayImage) : displayImage;

  // Format price to show properly
  const formattedPrice =
    typeof displayPrice === "number" ? displayPrice.toFixed(2) : displayPrice;

  // Generate destination URL for prefetching and navigation
  const getDestinationUrl = () => {
    if (!data) return null;

    if (isRegional && "region_id" in data) {
      const regionData = data as Region;
      return `/destination/${regionData._id}?region_id=${
        regionData._id
      }&region_name=${encodeURIComponent(regionData.name)}`;
    } else if ("country_id" in data) {
      const countryData = data as Country;
      return `/destination/${countryData._id}?country_id=${
        countryData._id
      }&country_name=${encodeURIComponent(countryData.name)}`;
    }
    return null;
  };

  const destinationUrl = getDestinationUrl();

  // Prefetch when card enters viewport using Intersection Observer
  useEffect(() => {
    if (!destinationUrl || !cardRef.current || hasPrefetched.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasPrefetched.current) {
            router.prefetch(destinationUrl);
            hasPrefetched.current = true;
          }
        });
      },
      {
        rootMargin: "50px", // Start prefetching 50px before entering viewport
      }
    );

    observer.observe(cardRef.current);

    return () => {
      observer.disconnect();
    };
  }, [destinationUrl, router]);

  // Prefetch on hover as backup
  const handleMouseEnter = () => {
    if (destinationUrl) {
      router.prefetch(destinationUrl);
    }
  };

  const CardContent = (
    <div
      className="relative rounded-[12.698px] aspect-[5/6] overflow-hidden cursor-pointer group block transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-2 will-change-transform"
      style={{
        backgroundImage: `url(${encodedImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      onMouseEnter={handleMouseEnter}
    >
      <div
        className="absolute bottom-0 w-full rounded-b-[12.698px]"
        style={{
          height: "177.778px",
          background:
            "linear-gradient(0deg, #042855 0%, rgba(4, 40, 85, 0) 100%)",
        }}
      ></div>

      <div
        className={`
                      sticker absolute bottom-[6px] sm:bottom-2 left-1/2 -translate-x-1/2 
                      w-[95%] max-w-full rounded-[9px] px-3 sm:px-[12.7px] pt-1 pb-2
                      transition-transform duration-300 ease-out group-hover:-translate-y-1
                      ${index % 2 === 0 ? "bg-primary-700" : "bg-secondary-200"}
                    `}
      >
        <div className="text-lg sm:text-[32px] font-extrabold font-barlow uppercase text-[#FAFAFA] leading-5.5 sm:leading-tight">
          {displayName}
        </div>
        <div className="text-xs sm:text-base md:text-lg text-[#FAFAFA]">
          {appStrings.startFrom} {destinationPriceSymbol}
          {formattedPrice}
        </div>
      </div>
    </div>
  );

  // Wrap with Link for prefetching if we have a destination URL
  if (destinationUrl) {
    return (
      <div ref={cardRef}>
        <Link
          href={destinationUrl}
          prefetch={false}
          className="block"
        >
          {CardContent}
        </Link>
      </div>
    );
  }

  // Fallback for cards without data (with onClick)
  if (onClick) {
    return <div onClick={onClick}>{CardContent}</div>;
  }

  return CardContent;
}

export default DestinationCard;
