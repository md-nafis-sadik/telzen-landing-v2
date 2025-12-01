"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRightSvg } from "@/service";
import { cn } from "@/service";

interface SeeMoreLinkProps {
  href?: string;
  text?: string;
  className?: string;
  containerClassName?: string;
  icon?: React.ReactNode;
  showIcon?: boolean;
  hoverDistance?: number;
}

function SeeMoreLink({
  href = "/destinations",
  text = "See more",
  className = "",
  containerClassName = "",
  icon,
  showIcon = true,
  hoverDistance = 4,
}: SeeMoreLinkProps) {
  return (
    <div className={cn("flex justify-center mt-6 lg:mt-10", containerClassName)}>
      <Link
        href={href}
        className={cn("group flex items-center gap-1 text-text-50", className)}
      >
        <motion.span
          initial={{ x: 0 }}
          whileHover={{ x: hoverDistance }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex items-center gap-2"
        >
          <span>{text}</span>
          {showIcon && (icon || <ArrowRightSvg />)}
        </motion.span>
      </Link>
    </div>
  );
}

export default SeeMoreLink;
