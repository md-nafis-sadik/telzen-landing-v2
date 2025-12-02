"use client";

import { StarPointSvg, appStrings } from "@/service";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

interface PackageCardProps {
  packageId: string;
  totalDataPlanInMb: number;
  validity: string;
  onPurchaseRewardPoint?: number;
  grandTotalSellingPrice: number;
  IconComponent: React.ComponentType<{ className?: string }>;
  onClick?: () => void;
  checkoutUrl?: string;
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
  checkoutUrl,
  formatDataSize,
}: PackageCardProps) {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const hasPrefetched = useRef(false);

  // Prefetch when card enters viewport using Intersection Observer
  useEffect(() => {
    if (!checkoutUrl || !cardRef.current || hasPrefetched.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasPrefetched.current) {
            router.prefetch(checkoutUrl);
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
  }, [checkoutUrl, router]);

  // Prefetch on hover as backup
  const handleMouseEnter = () => {
    if (checkoutUrl) {
      router.prefetch(checkoutUrl);
    }
  };

  const CardContent = (
    <div
      className="flex gap-3 cursor-pointer bg-text-100 p-4 rounded-2xl w-full border border-text-100 hover:bg-primary-50 hover:border hover:border-primary-700 transition-all duration-500 select-none active:scale-95"
      onMouseEnter={handleMouseEnter}
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
              {onPurchaseRewardPoint} {appStrings.points}
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

  // Wrap with Link for prefetching if we have a checkout URL
  if (checkoutUrl) {
    return (
      <div ref={cardRef}>
        <Link href={checkoutUrl} prefetch={false}>
          {CardContent}
        </Link>
      </div>
    );
  }

  // Fallback for cards without checkoutUrl (with onClick)
  if (onClick) {
    return <div onClick={onClick}>{CardContent}</div>;
  }

  return CardContent;
}

export default PackageCard;
