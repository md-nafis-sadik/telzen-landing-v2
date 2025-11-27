"use client";

import { ArrowLeftBlackSvg } from "@/service";
import BlurText from "../animation/BlurText";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

function HeaderPrev({
  text,
  link,
  className,
}: {
  text: string;
  link?: string;
  className?: string;
}) {
  const router = useRouter();

  const handleBack = () => {
    if (link) {
      router.push(link);
    } else {
      router.back();
    }
  };

  return (
    <div
      onClick={handleBack}
      className={`flex items-center gap-2 w-max select-none group ${className}`}
    >
      <motion.button
        initial={{ x: 0 }}
        whileHover={{ x: -5 }} // move a little left
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="cursor-pointer"
      >
        <ArrowLeftBlackSvg />
      </motion.button>

      <h2 className="backTitle text-text-950">
        <BlurText text={text} translateY={[50, 0]} />
      </h2>
    </div>
  );
}

export default HeaderPrev;
