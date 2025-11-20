"use client";

import React from "react";
import { motion } from "motion/react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  searchQuery?: string;
}

function EmptyState({ 
  title = "No Destinations Found", 
  description = "We couldn't find any destinations matching your search.",
  searchQuery 
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 md:py-20 lg:py-24">
      {/* Animated Empty Box SVG */}
      <motion.div 
        className="w-full max-w-[200px] md:max-w-[250px]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <svg
          viewBox="0 0 200 170"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Box Base */}
          <motion.path
            d="M100 140L40 105V55L100 20L160 55V105L100 140Z"
            stroke="#00C896"
            strokeWidth="3"
            fill="#E8F5F1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
          
          {/* Box Top */}
          <motion.path
            d="M100 90L40 55L100 20L160 55L100 90Z"
            stroke="#00C896"
            strokeWidth="3"
            fill="#B3E5D8"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeInOut" }}
          />
          
          {/* Box Right Side */}
          <motion.path
            d="M100 90V140L160 105V55L100 90Z"
            stroke="#00C896"
            strokeWidth="3"
            fill="#7FD4BD"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeInOut" }}
          />
          
          {/* Floating Particles */}
          <motion.circle
            cx="60"
            cy="40"
            r="3"
            fill="#00C896"
            animate={{ 
              y: [-5, 5, -5],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.circle
            cx="140"
            cy="60"
            r="2.5"
            fill="#00C896"
            animate={{ 
              y: [5, -5, 5],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{ 
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
          <motion.circle
            cx="100"
            cy="30"
            r="2"
            fill="#00C896"
            animate={{ 
              y: [-3, 3, -3],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          
          {/* Magnifying Glass */}
          <motion.g
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <motion.circle
              cx="130"
              cy="120"
              r="15"
              stroke="#00C896"
              strokeWidth="3"
              fill="none"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.line
              x1="141"
              y1="131"
              x2="155"
              y2="145"
              stroke="#00C896"
              strokeWidth="3"
              strokeLinecap="round"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.g>
        </svg>
      </motion.div>

      {/* Text Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-center"
      >
        <h3 className="text-xl md:text-2xl font-bold text-text-900 mb-3">
          {title}
        </h3>
        <p className="text-base md:text-lg text-text-600 max-w-md px-4">
          {searchQuery 
            ? (
              <>
                No destinations found for <span className="font-semibold text-primary-700">"{searchQuery}"</span>
                <br />
                <span className="text-sm mt-2 inline-block">Try adjusting your search or browse all destinations.</span>
              </>
            )
            : description
          }
        </p>
      </motion.div>
    </div>
  );
}

export default EmptyState;
