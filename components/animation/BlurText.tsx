"use client";
import { cn } from "@/service";
import { motion } from "motion/react";
import { memo, useMemo } from "react";

function BlurText({
  text = "",
  delay = 200,
  className = "",
  animateBy = "words",
  ...rest
}) {
  const animateText = useMemo(
    () => (animateBy === "words" ? text.split(" ") : text.split("")),
    [text, animateBy]
  );

  return animateText.map((item, index) => {
    const transition = {
      duration: 0.5,
      delay: index * (delay / 1000),
    };

    const variants = {
      animate: {
        ...rest,
        opacity: 1,
      },
    };

    return (
      <motion.span
        key={`${item}-${index}`}
        initial="animate"
        variants={variants}
        transition={transition}
        whileInView="animate"
        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        className={cn(className, "inline-block")}
      >
        {item}
        {animateBy === "words" && index < animateText.length - 1 ? "\u00A0" : ""}
      </motion.span>
    );
  });
}

export default memo(BlurText);
