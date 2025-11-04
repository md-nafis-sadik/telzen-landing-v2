"use client";
import { cn } from "@/service";
import { motion } from "motion/react";
import { useState } from "react";

interface Props {
  className?: string;
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yoyoAnimate?: any; // the animation object for yoyo
  yoyoTransition?: any; // transition for yoyo
  [key: string]: any;
}

function InfiniteBlurCard({
  className = "",
  children,
  delay = 200,
  duration = 0.5,
  yoyoAnimate = { scale: [1, 1.05, 1] },
  yoyoTransition = { duration: 1, repeat: Infinity, repeatType: "mirror" },
  ...rest
}: Props) {
  const [startYoyo, setStartYoyo] = useState(false);

  return (
    <motion.div
      animate={{
        opacity: [0, 1],
        filter: ["blur(10px)", "blur(0px)"],
      }}
      transition={{ duration, delay: delay / 1000 }}
      onAnimationComplete={() => setStartYoyo(true)}
      className={cn(className, "relative")}
      {...rest}
    >
      {startYoyo ? (
        <motion.div animate={yoyoAnimate} transition={yoyoTransition}>
          {children}
        </motion.div>
      ) : (
        children
      )}
    </motion.div>
  );
}

export default InfiniteBlurCard;
