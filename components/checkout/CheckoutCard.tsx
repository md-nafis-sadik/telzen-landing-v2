import {
  ArrowBothIconSvg,
  ClockIconSvg,
  images,
  RectanglesIconSvg,
  WorldIconSvg,
  appStrings,
  formatFloatingNumber,
} from "@/service";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import {
  Package,
  useLazyValidateCouponQuery,
} from "@/store/modules/destination/destinationApi";
import { toast } from "react-toastify";
import Input from "../shared/Input";
import Button from "../shared/Button";
import { useAppSelector } from "@/store/hooks";

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

  const prevGrandTotalRef = useRef<number | undefined>(undefined);
  const prevCouponIdRef = useRef<string | undefined>(undefined);
  const prevCouponLoadingRef = useRef<boolean | undefined>(undefined);

  // Get customer_id from auth state
  const authData = useAppSelector((state) => state.auth.auth);
  const customerId = authData?.customerId;

  // Helper function to format data size
  const formatDataSize = (sizeInMB: number) => {
    if (sizeInMB >= 1024) {
      return `${(sizeInMB / 1024).toFixed(0)} GB`;
    }
    return `${sizeInMB} MB`;
  };

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

    const subtotal = packageData?.grand_total_selling_price || 0;

    try {
      const result = await validateCoupon({
        couponCode: couponCode.trim(),
        customerId: customerId,
      }).unwrap();

      if (result.success && result.data) {
        const coupon = result.data;
        
        // Check minimum order amount (lower limit)
        if (subtotal < coupon.minimum_order_amount) {
          toast.error(
            `Minimum order amount is $${coupon.minimum_order_amount.toFixed(2)}. Your current order is $${subtotal.toFixed(2)}.`
          );
          return;
        }

        // Check maximum order amount (upper limit) - 0 means no limit
        if (coupon.maximum_order_amount > 0 && subtotal > coupon.maximum_order_amount) {
          toast.error(
            `Maximum order amount is $${coupon.maximum_order_amount.toFixed(2)}. Your current order is $${subtotal.toFixed(2)}.`
          );
          return;
        }

        // If all checks pass, apply the coupon
        setAppliedCoupon(coupon);
        setShowCouponInput(false);
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

  if (appliedCoupon) {
    // Check if price is within coupon limits
    const withinMinLimit = subtotal >= appliedCoupon.minimum_order_amount;
    const withinMaxLimit = appliedCoupon.maximum_order_amount === 0 || subtotal <= appliedCoupon.maximum_order_amount;
    
    if (withinMinLimit && withinMaxLimit) {
      if (appliedCoupon.discount.is_type_percentage) {
        // Percentage discount
        discount = (subtotal * appliedCoupon.discount.amount) / 100;
      } else {
        // Fixed amount discount
        discount = appliedCoupon.discount.amount;
      }
      
      // Ensure discount doesn't exceed subtotal
      discount = Math.min(discount, subtotal);
    }
  }

  const grandTotal = formatFloatingNumber(Math.max(subtotal - discount, 0));

  // Notify parent component when amount changes (only when value actually changes)
  useEffect(() => {
    if (prevGrandTotalRef.current !== grandTotal) {
      prevGrandTotalRef.current = grandTotal;
      onAmountChange?.(grandTotal);
    }
  }, [grandTotal, onAmountChange]);

  // Notify parent when coupon changes (only when value actually changes)
  useEffect(() => {
    const couponId = appliedCoupon?._id;
    if (prevCouponIdRef.current !== couponId) {
      prevCouponIdRef.current = couponId;
      onCouponChange?.(couponId);
    }
  }, [appliedCoupon, onCouponChange]);

  // Notify parent when coupon loading state changes (only when value actually changes)
  useEffect(() => {
    if (prevCouponLoadingRef.current !== couponLoading) {
      prevCouponLoadingRef.current = couponLoading;
      onCouponLoadingChange?.(couponLoading);
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
        <div className="border-t border-natural-200 pt-4 flex flex-col gap-4 text-sm lg:text-base">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span>Sub total</span>
            </div>
            <div className="font-bold">${formatFloatingNumber(subtotal)}</div>
          </div>

          {/* Show discount if coupon applied */}
          {appliedCoupon && discount > 0 && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span>Coupon Applied “{appliedCoupon.code}”</span>
              </div>
              <div className="font-bold">${formatFloatingNumber(discount)}</div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span>Grand Total</span>
            </div>
            <div className="font-bold">${formatFloatingNumber(grandTotal)}</div>
          </div>

          {/* Coupon section */}
          <div>
            {appliedCoupon ? (
              <div className="text-text-400 text-sm md:text-base tect-text-400">
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
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleApplyCoupon();
                    }
                  }}
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
