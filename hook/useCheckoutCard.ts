import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useAppSelector } from "@/store/hooks";
import {
  Package,
  useLazyValidateCouponQuery,
} from "@/store/modules/destination/destinationApi";
import { formatFloatingNumber } from "@/service";
import { setGrandTotal } from "@/store";
import { useDispatch } from "react-redux";

interface UseCheckoutCardProps {
  packageData?: Package;
  onAmountChange?: (amount: number) => void;
  onCouponChange?: (couponId: string | undefined) => void;
  onCouponLoadingChange?: (isLoading: boolean) => void;
}

export const useCheckoutCard = ({
  packageData,
  onAmountChange,
  onCouponChange,
  onCouponLoadingChange,
}: UseCheckoutCardProps) => {
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [validateCoupon, { isLoading: couponLoading }] =
    useLazyValidateCouponQuery();

  const prevGrandTotalRef = useRef<number | undefined>(undefined);
  const prevCouponIdRef = useRef<string | undefined>(undefined);
  const prevCouponLoadingRef = useRef<boolean | undefined>(undefined);
  const dispatch = useDispatch();

  const authData = useAppSelector((state) => state.auth.auth);
  const customerId = authData?.customerId;

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
      return packageData.coverage_countries[0];
    }
    return "Global";
  };

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

        if (subtotal < coupon.minimum_order_amount) {
          toast.error(
            `Minimum order amount is $${coupon.minimum_order_amount.toFixed(
              2
            )}. Your current order is $${subtotal.toFixed(2)}.`
          );
          return;
        }

        if (
          coupon.maximum_order_amount > 0 &&
          subtotal > coupon.maximum_order_amount
        ) {
          toast.error(
            `Maximum order amount is $${coupon.maximum_order_amount.toFixed(
              2
            )}. Your current order is $${subtotal.toFixed(2)}.`
          );
          return;
        }

        setAppliedCoupon(coupon);
        setShowCouponInput(false);
        toast.success("Coupon applied successfully!");
      } else {
        toast.error(result.error_messages[0].message || "Invalid coupon code");
      }
    } catch (error: any) {
      console.log("Coupon validation error:", error);
      const errorMessage =
        error?.data?.error_messages?.[0]?.message ||
        error?.data?.message ||
        "Failed to validate coupon. Please try again.";
      toast.error(errorMessage);
    }
  };

  const subtotal = packageData?.grand_total_selling_price || 0;
  let discount = 0;

  if (appliedCoupon) {
    const withinMinLimit = subtotal >= appliedCoupon.minimum_order_amount;
    const withinMaxLimit =
      appliedCoupon.maximum_order_amount === 0 ||
      subtotal <= appliedCoupon.maximum_order_amount;

    if (withinMinLimit && withinMaxLimit) {
      if (appliedCoupon.discount.is_type_percentage) {
        discount = (subtotal * appliedCoupon.discount.amount) / 100;
      } else {
        discount = appliedCoupon.discount.amount;
      }

      discount = Math.min(discount, subtotal);
    }
  }

  const grandTotal = formatFloatingNumber(Math.max(subtotal - discount, 0));

  useEffect(() => {
    if (prevGrandTotalRef.current !== grandTotal) {
      prevGrandTotalRef.current = grandTotal;
      onAmountChange?.(grandTotal);
      dispatch(setGrandTotal(grandTotal));
    }
  }, [grandTotal, onAmountChange, dispatch]);

  useEffect(() => {
    const couponId = appliedCoupon?._id;
    if (prevCouponIdRef.current !== couponId) {
      prevCouponIdRef.current = couponId;
      onCouponChange?.(couponId);
    }
  }, [appliedCoupon, onCouponChange]);

  useEffect(() => {
    if (prevCouponLoadingRef.current !== couponLoading) {
      prevCouponLoadingRef.current = couponLoading;
      onCouponLoadingChange?.(couponLoading);
    }
  }, [couponLoading, onCouponLoadingChange]);

  return {
    couponCode,
    setCouponCode,
    appliedCoupon,
    showCouponInput,
    setShowCouponInput,
    couponLoading,
    formatDataSize,
    getCoverageText,
    handleApplyCoupon,
    subtotal,
    discount,
    grandTotal,
  };
};
