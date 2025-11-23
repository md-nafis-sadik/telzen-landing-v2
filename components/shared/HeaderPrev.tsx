"use client";

import { ArrowLeftBlackSvg } from "@/service";
import BlurText from "../animation/BlurText";
import { useRouter } from "next/navigation";

function HeaderPrev({ text, link }: { text: string; link?: string }) {
  const router = useRouter();

  const handleBack = () => {
    if (link) {
      router.push(link);
    } else {
      router.back();
    }
  };

  return (
    <div className="flex items-center gap-2 w-max select-none">
      <button onClick={handleBack} className="cursor-pointer">
        <ArrowLeftBlackSvg />
      </button>
      <h2 className="backTitle text-text-950">
        <BlurText text={text} translateY={[50, 0]} />
      </h2>
    </div>
  );
}

export default HeaderPrev;
