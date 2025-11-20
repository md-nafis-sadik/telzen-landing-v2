"use client";

import { motion, AnimatePresence } from 'motion/react';
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setDestinationType, DestinationType } from "@/store/modules/destination/destinationSlice";

interface BigToggleSwitchProps {
  primaryColor?: string;
  firstbuttonText?: string;
  secondbuttonText?: string;
  className?: string;
  secondaryColor?: string;
  onToggle?: (type: DestinationType) => void;
}

function BigToggleSwitch({
  primaryColor,
  firstbuttonText = "Countries",
  secondbuttonText = "Regional Packs",
  className,
  secondaryColor,
  onToggle,
}: BigToggleSwitchProps) {
  const dispatch = useAppDispatch();
  const { activeType } = useAppSelector((state) => state.destination);
  
  const isCountriesActive = activeType === 'countries';
  
  const handleToggle = (type: DestinationType) => {
    dispatch(setDestinationType(type));
    onToggle?.(type);
  };

  return (
    <div
      className={`bg-natural-200 w-max rounded-full h-[52px] flex items-center font-semibold text-sm md:text-base relative overflow-hidden ${className}`}
    >
      {/* Animated Background Slider */}
      <motion.div
        className={`absolute top-0 bottom-0 left-0 rounded-full ${primaryColor || "bg-primary-700"} z-0`}
        initial={false}
        animate={{
          x: isCountriesActive ? 0 : '100%',
          width: '50%'
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30
        }}
      />
      
      {/* Countries Button */}
      <motion.button
        onClick={() => handleToggle('countries')}
        className="rounded-full px-3 sm:px-4 md:px-6 py-2 h-full flex items-center z-10 relative w-1/2 justify-center"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.span
          className="whitespace-nowrap text-xs sm:text-sm md:text-base"
          animate={{
            color: isCountriesActive ? '#FFFFFF' : '#6B7280'
          }}
          transition={{ duration: 0.2 }}
        >
          {firstbuttonText}
        </motion.span>
      </motion.button>
      
      {/* Regional Packs Button */}
      <motion.button
        onClick={() => handleToggle('regions')}
        className="rounded-full px-3 sm:px-4 md:px-6 py-2 h-full flex items-center z-10 relative w-1/2 justify-center"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.span
          className="whitespace-nowrap text-xs sm:text-sm md:text-base"
          animate={{
            color: !isCountriesActive ? '#FFFFFF' : '#6B7280'
          }}
          transition={{ duration: 0.2 }}
        >
          {secondbuttonText}
        </motion.span>
      </motion.button>
    </div>
  );
}

export default BigToggleSwitch;
