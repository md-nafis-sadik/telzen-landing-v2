import { ArrowLeftBlackSvg } from "@/service";
import BlurText from "../animation/BlurText";

function HeaderPrev({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 cursor-pointer w-max">
      <ArrowLeftBlackSvg />
      <h2 className="backTitle text-text-950">
        <BlurText text={text} translateY={[50, 0]} />
      </h2>
    </div>
  );
}

export default HeaderPrev;
