"use client";
import { cn } from "@/service";
import { motion } from "motion/react";
import { memo, useMemo } from "react";

function AnimateCard({
  text = "",
  delay = 200,
  className = "",
  children,
  ...rest
}: {
  text?: string;
  delay?: number;
  className?: string;
  children: React.ReactNode;
  [key: string]: any;
}) {
  const animateProps = useMemo(
    () => ({
      ...rest,
      opacity: 1,
    }),
    [rest]
  );

  const transition = useMemo(
    () => ({
      duration: 0.5,
      delay: delay / 1000,
    }),
    [delay]
  );

  return (
    <motion.div
      initial={{ opacity: 0, ...rest }}
      whileInView={animateProps}
      transition={transition}
      viewport={{ once: true, margin: "0px 0px -100px 0px", amount: 0.3 }}
      className={cn(className, "relative")}
    >
      {children}
    </motion.div>
  );
}

export default memo(AnimateCard);
