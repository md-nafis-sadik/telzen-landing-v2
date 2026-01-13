"use client";

import { Suspense } from "react";
import { motion } from "motion/react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { appStrings, images } from "@/service";
import Button from "@/components/shared/Button";

function FailedContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");
  const reason = searchParams.get("reason");
  const router = useRouter();

  return (
    <div className="containerX py-28">
      <div className="w-full max-w-[505px] mx-auto">
        <div className="mb-6 flex justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.2,
              duration: 0.5,
              type: "spring",
              bounce: 0.5,
            }}
            className="relative"
          >
            <Image
              src={images?.removeIcon}
              alt="successful"
              width={200}
              height={200}
              priority
            />
          </motion.div>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-4xl md:text-[56px] font-extrabold text-black font-barlow mb-4 text-center uppercase"
        >
          Payment Failed!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-text-700 mb-6 text-center"
        >
          Unfortunately, your payment could not be processed. Try again later.
          {/* {orderId && (
          <div className="mt-2 text-sm text-gray-600">Order ID: {orderId}</div>
        )} */}
        </motion.p>

        <div className="flex gap-3 lg:gap-6 w-full">
          <Button
            variant="secondary"
            size="md"
            fullWidth
            animate
            className="mb-3 bg-black text-white hover:bg-natural-950 border-black w-full"
            onClick={() => {
              router.push("/destinations");
            }}
          >
            {appStrings.destinations}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutFailed() {
  return (
    <main className="font-inter bg-white min-h-screen">
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700"></div>
          </div>
        }
      >
        <FailedContent />
      </Suspense>
    </main>
  );
}
