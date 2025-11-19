"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { images } from "@/service";

function CheckoutSuccessful() {
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
      </motion.p>

      <div className="flex gap-3 lg:gap-6">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          // onClick={handleExploreHomepage}
          className="w-full px-4 py-2 h-13 bg-black text-white rounded-full cursor-pointer hover:bg-natural-950 transition disabled:opacity-50 disabled:cursor-not-allowed mb-3 font-semibold text-sm md:text-base"
        >
          Homepage
        </motion.button>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          // onClick={handleExploreHomepage}
          className="w-full px-4 py-2 h-13 bg-primary-700 text-white rounded-full cursor-pointer hover:bg-primary-800 transition disabled:opacity-50 disabled:cursor-not-allowed mb-3 font-semibold text-sm md:text-base"
        >
          My eSIM
        </motion.button>
      </div>
    </div>
  );
}

export default CheckoutSuccessful;
