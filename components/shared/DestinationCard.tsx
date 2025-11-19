import { cn, images } from "@/service";

function DestinationCard({
  buttonText = "Click Me",
  className = "",
  index = 0,
  destinationImage,
  destinationName,
  destinationPriceSymbol,
  destinationPrice,
  onClick,
  ...props
}: {
  buttonText?: string;
  className?: string;
  index?: number;
  destinationImage?: string;
  destinationName?: string;
  destinationPriceSymbol?: string;
  destinationPrice?: string;
  onClick?: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <div
      key={index}
      className="relative rounded-[12.698px] aspect-[5/6] overflow-hidden cursor-pointer"
      style={{
        backgroundImage: `url(${destinationImage || images?.newZealand})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
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
                      sticker absolute bottom-2 left-1/2 -translate-x-1/2 
                      w-[95%] max-w-full rounded-[9px] px-3 sm:px-[12.7px] pt-1 pb-2
                      ${index % 2 === 0 ? "bg-primary-700" : "bg-secondary-200"}
                    `}
      >
        <div className="text-2xl sm:text-[32px] font-extrabold font-barlow uppercase text-[#FAFAFA] leading-tight">
          {destinationName || "New Zealand"}
        </div>
        <div className="text-base sm:text-lg text-[#FAFAFA]">
          Start from {destinationPriceSymbol || "$"}
          {destinationPrice || 0}
        </div>
      </div>
    </div>
  );
}

export default DestinationCard;
