"use client";
import { cn } from "@/service";
import { motion } from "motion/react";

function AnimateText({
  text = "",
  delay = 200,
  className = "",
  animateBy = "words",
  ...rest
}) {
  const animateText = animateBy === "words" ? text.split(" ") : text.split("");

  return animateText.map((item, index) => (
    <motion.span
      key={index}
      initial={{ opacity: 0 }}
      animate={{
        ...rest,
        opacity: [0, 1],
      }}
      transition={{
        duration: 0.5,
        delay: index * (delay / 1000),
      }}
      whileInView="animate"
      viewport={{ once: true }}
      className={cn(className, "inline-block")}
    >
      {item}
      {animateBy === "words" && index < animateText.length - 1 ? "\u00A0" : ""}
    </motion.span>
  ));
}

export default AnimateText;
