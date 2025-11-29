import {
  ArrowBothIconSvg,
  ClockIconSvg,
  images,
  RectanglesIconSvg,
  WorldIconSvg,
  appStrings,
} from "@/service";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  Package,
  useLazyValidateCouponQuery,
} from "@/store/modules/destination/destinationApi";
import { toast } from "react-toastify";
import Input from "../shared/Input";
import Button from "../shared/Button";

interface CheckoutCardProps {
  packageData?: Package;
  onAmountChange?: (amount: number) => void;
  onCouponChange?: (couponId: string | undefined) => void;
  onCouponLoadingChange?: (isLoading: boolean) => void;
}

function CheckoutCard({
  packageData,
  onAmountChange,
  onCouponChange,
  onCouponLoadingChange,
}: CheckoutCardProps) {
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [validateCoupon, { isLoading: couponLoading }] =
    useLazyValidateCouponQuery();

  // Helper function to format data size
  const formatDataSize = (sizeInMB: number) => {
    if (sizeInMB >= 1024) {
      return `${(sizeInMB / 1024).toFixed(0)} GB`;
    }
    return `${sizeInMB} MB`;
  };

  // Get coverage display text
  const getCoverageText = () => {
    if (!packageData) return "N/A";

    if (
      packageData.coverage_type === "regional" &&
      packageData.coverage_region
    ) {
      return packageData.coverage_region;
    } else if (
      packageData.coverage_countries &&
      packageData.coverage_countries.length > 0
    ) {
      return packageData.coverage_countries[0]; // Show first country
    }
    return "Global";
  };

  // Coupon validation handler
  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }

    try {
      const result = await validateCoupon(couponCode.trim()).unwrap();

      if (result.success && result.data) {
        setAppliedCoupon(result.data);
        toast.success("Coupon applied successfully!");
      } else {
        toast.error(result.message || "Invalid coupon code");
      }
    } catch (error: any) {
      console.log("Coupon validation error:", error);
      const errorMessage =
        error?.data?.message || "Failed to validate coupon. Please try again.";
      toast.error(errorMessage);
    }
  };

  // Calculate prices with coupon
  const subtotal = packageData?.grand_total_selling_price || 0;
  let discount = 0;

  if (appliedCoupon && subtotal >= appliedCoupon.minimum_order_amount) {
    if (appliedCoupon.type === "percentage") {
      discount = (subtotal * appliedCoupon.value) / 100;
      if (appliedCoupon.maximum_discount_amount) {
        discount = Math.min(discount, appliedCoupon.maximum_discount_amount);
      }
    } else {
      discount = appliedCoupon.value;
    }
  }

  const grandTotal = subtotal - discount;

  // Notify parent component when amount or coupon changes
  useEffect(() => {
    if (onAmountChange) {
      onAmountChange(grandTotal);
    }
  }, [grandTotal, onAmountChange]);

  useEffect(() => {
    if (onCouponChange) {
      onCouponChange(appliedCoupon?._id);
    }
  }, [appliedCoupon, onCouponChange]);

  useEffect(() => {
    if (onCouponLoadingChange) {
      onCouponLoadingChange(couponLoading);
    }
  }, [couponLoading, onCouponLoadingChange]);

  return (
    <div className="bg-white rounded-3xl p-6 w-full h-max">
      <div className="flex flex-col xl:flex-row justify-between bg-primary-100 rounded-lg overflow-hidden">
        <div className="py-4 lg:py-6 pl-4 lg:pl-6 pr-4 lg:pr-2 text-center xl:text-left">
          <div className="text-xl md:text-xl lg:text-2xl 2xl:text-3xl font-barlow font-black uppercase">
            responsibility
          </div>
          <div className="text-[#042855] text-xs lg:text-sm">
            We keep our commitment toward green world. We plant a tree on each
            package purchased.
          </div>
        </div>
        <div className="flex items-center justify-center xl:mr-6">
          <div>
            <Image
              src={images?.palmTree}
              alt="world"
              width={193}
              height={170}
              priority
              className="mb-[-15px] xl:mt-[10px] min-w-[132px]"
            />
          </div>
        </div>
      </div>
      <div>
        {/* <div className="text-center mb-4">
          <h3 className="text-lg md:text-xl font-bold text-text-950">
            {packageData?.name || "Selected Package"}
          </h3>
        </div> */}
        <div className="flex flex-col gap-4 my-4 text-sm lg:text-base">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span>
                <WorldIconSvg />
              </span>
              <span>Coverage</span>
            </div>
            <div className="font-bold">{getCoverageText()}</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span>
                <ArrowBothIconSvg />
              </span>
              <span>Plan</span>
            </div>
            <div className="font-bold">
              {packageData
                ? formatDataSize(packageData.total_data_plan_in_mb)
                : "N/A"}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span>
                <RectanglesIconSvg />
              </span>
              <span>Type</span>
            </div>
            <div className="font-bold">Data Only</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span>
                <ClockIconSvg />
              </span>
              <span>Validity</span>
            </div>
            <div className="font-bold">{packageData?.validity || "N/A"}</div>
          </div>
        </div>
        <div className="border-t pt-4 flex flex-col gap-4 text-sm lg:text-base">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span>Sub total</span>
            </div>
            <div className="font-bold">${subtotal.toFixed(2)}</div>
          </div>

          {/* Show discount if coupon applied */}
          {appliedCoupon && discount > 0 && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span>Coupon Applied &quot;{appliedCoupon.code}&quot;</span>
              </div>
              <div className="font-bold">-${discount.toFixed(2)}</div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span>Grand Total</span>
            </div>
            <div className="font-bold">${grandTotal.toFixed(2)}</div>
          </div>

          {/* Coupon section */}
          <div>
            {appliedCoupon ? (
              <div className="text-text-400 font-medium text-sm">
                {appStrings.couponApplied}
              </div>
            ) : showCouponInput ? (
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  placeholder={appStrings.enterCouponCode}
                  className="flex-1 text-sm"
                />
                <Button
                  variant="primary"
                  onClick={handleApplyCoupon}
                  disabled={!couponCode.trim()}
                  isLoading={couponLoading}
                  loadingText={appStrings.applying}
                  className="text-sm whitespace-nowrap max-h-[46px]"
                >
                  {appStrings.applyCouponBtn}
                </Button>
              </div>
            ) : (
              <Button
                variant="link"
                onClick={() => setShowCouponInput(true)}
                className="underline"
              >
                {appStrings.applyCoupon}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutCard;
