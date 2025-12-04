"use client";
import { cn } from "@/service";
import { motion } from "motion/react";
import { useState, memo, useMemo, useCallback } from "react";

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
  yoyoTransition = {
    duration: 1,
    repeat: Infinity,
    repeatType: "mirror",
  },
  ...rest
}: Props) {
  const [startYoyo, setStartYoyo] = useState(false);

  const transition = useMemo(
    () => ({ duration: duration, delay: delay / 1000 }),
    [duration, delay]
  );

  const handleAnimationComplete = useCallback(() => {
    setStartYoyo(true);
  }, []);

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.95,
      }}
      animate={{ opacity: 1, scale: 1 }}
      transition={transition}
      onAnimationComplete={handleAnimationComplete}
      className={cn(className, "relative")}
      {...rest}
    >
      {startYoyo ? (
        <motion.div animate={yoyoAnimate} transition={{ ...yoyoTransition }}>
          {children}
        </motion.div>
      ) : (
        children
      )}
    </motion.div>
  );
}

export default memo(InfiniteBlurCard);
