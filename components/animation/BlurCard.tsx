"use client";
import { cn } from "@/service";
import { motion } from "motion/react";

function BlurCard({
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
      animate={{
        ...rest,
        opacity: [0, 1],
        filter: ["blur(10px)", "blur(0px)"],
      }}
      transition={{
        duration: 0.5,
        delay: delay / 1000,
      }}
      whileInView={{
        ...rest,
        opacity: [0, 1],
        filter: ["blur(10px)", "blur(0px)"],
      }}
      viewport={{ once: true }}
      className={cn(className, "relative")}
    >
      {children}
    </motion.div>
  );
}

export default BlurCard;
