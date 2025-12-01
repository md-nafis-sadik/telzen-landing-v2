"use client";

import { motion } from "motion/react";
import { cn, images } from "@/service";
import { Region, Country } from "@/store/modules/destination/destinationApi";
import { useRouter } from "next/navigation";

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
  buttonText = "Click Me",
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

  // Use data from API if available, otherwise fallback to props
  const displayImage = data?.image || destinationImage || images?.newZealand;
  const displayName = data?.name || destinationName || "New Zealand";
  const displayPrice = data?.start_from || destinationPrice || 0;

  // Encode the image URL to handle spaces and special characters
  const encodedImageUrl = displayImage ? encodeURI(displayImage) : displayImage;

  // Format price to show properly
  const formattedPrice =
    typeof displayPrice === "number" ? displayPrice.toFixed(2) : displayPrice;

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    } else if (data) {
      // Navigate to destination details with proper parameters
      if (isRegional && "region_id" in data) {
        const regionData = data as Region;
        router.push(
          `/destination/${regionData._id}?region_id=${
            regionData._id
          }&region_name=${encodeURIComponent(regionData.name)}`
        );
      } else if ("country_id" in data) {
        const countryData = data as Country;
        router.push(
          `/destination/${countryData._id}?country_id=${
            countryData._id
          }&country_name=${encodeURIComponent(countryData.name)}`
        );
      }
    }
  };

  return (
    <motion.div
      key={index}
      className="relative rounded-[12.698px] aspect-[5/6] overflow-hidden cursor-pointer group"
      style={{
        backgroundImage: `url(${encodedImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      whileHover={{
        scale: 1.05,
        y: -8,
      }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
      onClick={handleCardClick}
    >
      <motion.div
        className="absolute bottom-0 w-full rounded-b-[12.698px]"
        style={{
          height: "177.778px",
          background:
            "linear-gradient(0deg, #042855 0%, rgba(4, 40, 85, 0) 100%)",
        }}
      ></motion.div>

      <motion.div
        className={`
                      sticker absolute bottom-2 left-1/2 -translate-x-1/2 
                      w-[95%] max-w-full rounded-[9px] px-3 sm:px-[12.7px] pt-1 pb-2
                      ${index % 2 === 0 ? "bg-primary-700" : "bg-secondary-200"}
                    `}
        initial={{ y: 0 }}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="text-2xl sm:text-[32px] font-extrabold font-barlow uppercase text-[#FAFAFA] leading-tight">
          {displayName}
        </div>
        <div className="text-base sm:text-lg text-[#FAFAFA]">
          Start from {destinationPriceSymbol}
          {formattedPrice}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default DestinationCard;
