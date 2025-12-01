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
import { Package } from "@/store/modules/destination/destinationApi";
import Input from "../shared/Input";
import Button from "../shared/Button";
import { useCheckoutCard } from "@/hook";

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
  const {
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
  } = useCheckoutCard({
    packageData,
    onAmountChange,
    onCouponChange,
    onCouponLoadingChange,
  });

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
