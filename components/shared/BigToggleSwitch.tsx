"use client";

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setDestinationType, DestinationType } from "@/store/modules/destination/destinationSlice";

interface BigToggleSwitchProps {
  primaryColor?: string;
  firstbuttonText?: string;
  secondbuttonText?: string;
  className?: string;
  secondaryColor?: string;
  onToggle?: (type: DestinationType | string) => void;
  useLocalState?: boolean; // If true, use local state instead of Redux
  defaultActive?: 'first' | 'second'; // Default active button when using local state
}

function BigToggleSwitch({
  primaryColor,
  firstbuttonText = "Countries",
  secondbuttonText = "Regional Packs",
  className,
  secondaryColor,
  onToggle,
  useLocalState = false,
  defaultActive = 'first',
}: BigToggleSwitchProps) {
  const dispatch = useAppDispatch();
  const { activeType } = useAppSelector((state) => state.destination);
  const [localActive, setLocalActive] = useState<'first' | 'second'>(defaultActive);
  
  // Use local state if specified, otherwise use Redux state
  const isFirstActive = useLocalState 
    ? localActive === 'first' 
    : activeType === 'countries';
  
  const handleToggle = useCallback((type: DestinationType, buttonText: string, position: 'first' | 'second') => {
    if (useLocalState) {
      setLocalActive(position);
    } else {
      dispatch(setDestinationType(type));
    }
    // Pass button text for custom handlers (like MyEsim), or type for standard handlers
    onToggle?.(buttonText);
  }, [useLocalState, dispatch, onToggle]);

  return (
    <div
      className={`bg-natural-200 w-max rounded-full h-[40px] md:h-[52px] flex items-center font-semibold text-sm md:text-base relative overflow-hidden ${className}`}
    >
      {/* Animated Background Slider */}
      <motion.div
        className={`absolute top-0 bottom-0 left-0 rounded-full ${primaryColor || "bg-primary-700 shadow-md"} z-0`}
        initial={false}
        animate={{
          x: isFirstActive ? 0 : '100%',
          width: '50%'
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30
        }}
      />
      
      {/* First Button */}
      <motion.button
        onClick={() => handleToggle('countries', firstbuttonText, 'first')}
        className="rounded-full cursor-pointer px-3 sm:px-4 md:px-6 py-2 h-full flex items-center z-10 relative w-1/2 justify-center"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.span
          className="whitespace-nowrap text-xs sm:text-sm md:text-base"
          animate={{
            color: isFirstActive ? '#FFFFFF' : '#0A0A0A'
          }}
          transition={{ duration: 0.2 }}
        >
          {firstbuttonText}
        </motion.span>
      </motion.button>
      
      {/* Second Button */}
      <motion.button
        onClick={() => handleToggle('regions', secondbuttonText, 'second')}
        className="rounded-full cursor-pointer px-3 sm:px-4 md:px-6 py-2 h-full flex items-center z-10 relative w-1/2 justify-center"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.span
          className="whitespace-nowrap text-xs sm:text-sm md:text-base"
          animate={{
            color: !isFirstActive ? '#FFFFFF' : '#0A0A0A'
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
