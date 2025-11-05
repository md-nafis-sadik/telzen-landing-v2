"use client";
import { cn } from "@/service";
import { motion } from "motion/react";

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
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        ...rest,
        opacity: 1,
      }}
      transition={{
        duration: 0.5,
        delay: delay / 1000,
      }}
      whileInView={{
        ...rest,
        opacity: 1,
      }}
      viewport={{ once: true }}
      className={cn(className, "relative")}
    >
      {children}
    </motion.div>
  );
}

export default AnimateCard;
