"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { images, appStrings } from "@/service";
import Button from "../shared/Button";
import { useRouter } from "next/navigation";

// Add interface for props
interface CheckoutSuccessfulProps {
  orderId?: string | null;
  packageName?: string;
  amount?: number;
  couponCode?: string;
}

function CheckoutSuccessful({
  orderId,
  packageName,
  amount,
  couponCode,
}: CheckoutSuccessfulProps) {
  const router = useRouter();

  return (
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
            src={images?.successful}
            alt="successful"
            width={260}
            height={260}
            priority
          />
        </motion.div>
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-4xl md:text-[56px] font-extrabold text-primary-700 font-barlow mb-4 text-center uppercase"
      >
        Purchase Successful!
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-text-700 mb-6 text-center"
      >
        You can continue using Telzen eSIM now.
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
              router.push("/");
            }}  
          >
            {appStrings.homepage}
          </Button>
        
          <Button
            variant="primary"
            size="md"
            fullWidth
            animate
            className="mb-3 w-full"
            onClick={() => {
              router.push("/my-esim");
            }}  
          >
            {appStrings.myEsim}
          </Button>
        
      </div>
    </div>
  );
}

export default CheckoutSuccessful;
