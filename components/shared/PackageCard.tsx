"use client";

import { StarPointSvg } from "@/service";

interface PackageCardProps {
  packageId: string;
  totalDataPlanInMb: number;
  validity: string;
  onPurchaseRewardPoint?: number;
  grandTotalSellingPrice: number;
  IconComponent: React.ComponentType<{ className?: string }>;
  onClick: () => void;
  formatDataSize: (sizeInMB: number) => string;
}

function PackageCard({
  packageId,
  totalDataPlanInMb,
  validity,
  onPurchaseRewardPoint = 0,
  grandTotalSellingPrice,
  IconComponent,
  onClick,
  formatDataSize,
}: PackageCardProps) {
  return (
    <div
      key={packageId}
      className="flex gap-3 cursor-pointer bg-text-100 p-4 rounded-2xl w-full border border-text-100 hover:bg-primary-50 hover:border hover:border-primary-700 transition-all duration-500 select-none"
      onClick={onClick}
    >
      <div className="flex flex-col w-full gap-3">
        <span>
          <IconComponent className="w-6 h-6" />
        </span>
        <div className="flex flex-col gap-1">
          <div className="text-base md:text-lg lg:text-xl xl:text-2xl tracking-wider">
            {formatDataSize(totalDataPlanInMb)} • {validity}
          </div>
          <div className="flex items-center gap-1">
            <span>
              <StarPointSvg className="w-3.5 md:w-4.5 lg:w-6 h-3.5 md:h-4.5 lg:h-6" />
            </span>
            <span className="text-natural-500 text-xs md:text-sm lg:text-base">
              {onPurchaseRewardPoint} Points
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end justify-end">
        <div className="text-lg md:text-xl lg:text-2xl xl:text-[28px] justify-end font-semibold">
          ${grandTotalSellingPrice.toFixed(2)}
        </div>
      </div>
    </div>
  );
}

export default PackageCard;
