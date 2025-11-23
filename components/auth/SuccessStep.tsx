"use client";

import React from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { closeAuthModal } from "@/store/modules/ui/uiSlice";
import { motion } from "motion/react";
import Image from "next/image";
import { images, appStrings } from "@/service";
import Button from "../shared/Button";

const SuccessStep: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleExploreHomepage = () => {
    dispatch(closeAuthModal());
  };

  return (
    <div className="text-center">
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
        className="text-4xl md:text-[56px] font-extrabold text-primary-700 font-barlow mb-4"
      >
        SUCCESSFUL
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-text-50 mb-6"
      >
        Your account has been created.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Button
          variant="primary"
          size="md"
          fullWidth
          onClick={handleExploreHomepage}
          animate
          className="mb-3"
        >
          Explore Homepage
        </Button>
      </motion.div>
    </div>
  );
};

export default SuccessStep;
