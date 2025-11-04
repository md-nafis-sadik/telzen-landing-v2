"use client";
import { cn } from "@/service";
import { motion } from "motion/react";

function BlurText({
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
      animate={{
        ...rest,
        opacity: [0, 1],
        filter: ["blur(10px)", "blur(0px)"],
      }}
      transition={{
        duration: 0.5,
        delay: index * (delay / 1000),
      }}
      whileInView={{
        ...rest,
        opacity: [0, 1],
        filter: ["blur(10px)", "blur(0px)"],
      }}
      viewport={{ once: true }}
      className={cn(className, "inline-block")}
    >
      {item}
      {animateBy === "words" && index < animateText.length - 1 ? "\u00A0" : ""}
    </motion.span>
  ));
}

export default BlurText;
