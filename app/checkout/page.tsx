"use client";

import CheckoutCard from "@/components/checkout/CheckoutCard";
import CheckoutLoginForm from "@/components/checkout/CheckoutLoginForm";
import CheckoutSuccessful from "@/components/checkout/CheckoutSuccessful";
import EmbeddedCheckoutForm from "@/components/checkout/EmbeddedCheckoutForm";
import HeaderPrev from "@/components/shared/HeaderPrev";
import { useSearchParams } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { useGetSinglePackageQuery } from "@/store/modules/destination/destinationApi";
import { useState } from "react";

function CheckOut() {
  const searchParams = useSearchParams();
  const { isAuthenticated, authInitialized } = useAppSelector(
    (state) => state.auth
  );
  const [showSuccess, setShowSuccess] = useState(false);
  const [finalAmount, setFinalAmount] = useState<number>(0);
  const [appliedCouponId, setAppliedCouponId] = useState<string | undefined>();

  const packageId = searchParams.get("package_id");
  const countryId = searchParams.get("country_id");
  const regionId = searchParams.get("region_id");
  const orderType = searchParams.get("order_type") || "new";

  const {
    data: packageData,
    isLoading,
    error,
  } = useGetSinglePackageQuery(
    {
      package_id: packageId || "",
      country_id: countryId || undefined,
      region_id: regionId || undefined,
    },
    {
      skip: !packageId || !authInitialized,
    }
  );

  if (!authInitialized) {
    return (
      <main className="font-inter bg-white">
        <section className="py-10 md:py-16 lg:py-20 bg-[#fafafa] flex items-center justify-center min-h-screen">
          <div className="text-center text-text-700">
            <h2 className="text-2xl font-bold mb-4">Initializing...</h2>
          </div>
        </section>
      </main>
    );
  }

  if (!packageId) {
    return (
      <main className="font-inter bg-white">
        <section className="py-10 md:py-16 lg:py-20 bg-[#fafafa] flex items-center justify-center min-h-screen">
          <div className="text-center text-text-700">
            <h2 className="text-2xl font-bold mb-4">No Package Selected</h2>
            <p>Please select a package to continue with checkout.</p>
          </div>
        </section>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="font-inter bg-white">
        <section
          className="py-10 md:py-16 lg:py-20 bg-[#fafafa] flex"
          id="destinations"
        >
          <div className="w-full h-full">
            <div className="containerX">
              <div className="flex items-center gap-2 w-max mb-10">
                <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-32 h-8 bg-gray-200 rounded animate-pulse"></div>
              </div>

              <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-12">
                <div className="flex-1">
                  <div className="bg-white rounded-3xl p-6 space-y-6">
                    <div className="w-48 h-8 bg-gray-200 rounded animate-pulse"></div>

                    {Array.from({ length: 4 }).map((_, index) => (
                      <div key={index} className="space-y-2">
                        <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
                        <div className="w-full h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                      </div>
                    ))}

                    <div className="w-full h-12 bg-gray-200 rounded-full animate-pulse"></div>
                  </div>
                </div>

                <div className="w-full lg:w-1/2">
                  <div className="bg-white rounded-3xl p-6 space-y-4">
                    <div className="bg-gray-100 rounded-lg p-4 space-y-2">
                      <div className="w-32 h-6 bg-gray-200 rounded animate-pulse"></div>
                      <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse"></div>
                    </div>

                    <div className="space-y-4">
                      <div className="w-40 h-6 bg-gray-200 rounded animate-pulse mx-auto"></div>

                      {Array.from({ length: 4 }).map((_, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center"
                        >
                          <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
                          <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                      ))}

                      <div className="border-t pt-4 space-y-4">
                        <div className="flex justify-between items-center">
                          <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                          <div className="w-12 h-4 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
                          <div className="w-16 h-5 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (error || !packageData?.data) {
    return (
      <main className="font-inter bg-white">
        <section className="py-10 md:py-16 lg:py-20 bg-[#fafafa] flex items-center justify-center min-h-screen">
          <div className="text-center text-text-700">
            <h2 className="text-2xl font-bold mb-4">Package Not Found</h2>
            <p>The selected package could not be found.</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="font-inter bg-white">
      <section
        className="py-10 md:py-16 lg:py-20 bg-[#fafafa] flex"
        id="destinations"
      >
        <div className="w-full h-full">
          <div className="containerX">
            {showSuccess ? (
              <div className="flex flex-col justify-center items-center h-full py-20">
                <CheckoutSuccessful />
              </div>
            ) : (
              <>
                <HeaderPrev text="Check out" />
                <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-12 mt-10">
                  {!isAuthenticated ? (
                    <CheckoutLoginForm />
                  ) : (
                    <EmbeddedCheckoutForm
                      packageId={packageId}
                      amount={finalAmount > 0 ? finalAmount : packageData?.data?.grand_total_selling_price || 0}
                      currency="USD"
                      couponId={appliedCouponId}
                      orderType={orderType as "new" | "topup"}
                    />
                  )}
                  <CheckoutCard
                    packageData={packageData.data}
                    onAmountChange={setFinalAmount}
                    onCouponChange={setAppliedCouponId}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default CheckOut;
