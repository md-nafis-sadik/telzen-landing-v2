"use client";
import { ArrowDownIcon, cn, whyChooseList } from "@/service";
import { useRef, useState } from "react";
import BlurCard from "../animation/BlurCard";

interface IAccordion {
  id: number | string;
  question: string;
  answer: string;
}

export default function WhyChooseAccordion() {
  const refs = useRef<Record<string, HTMLDivElement | null>>({});
  const [submenuOpen, setSubmenuOpen] = useState<Record<string, boolean>>({});

  const handleDropdown = (menu: string) => {
    setSubmenuOpen((prev) => ({
      [menu]: !prev[menu],
    }));
  };

  return (
    <div className="w-full flex flex-col gap-4 lg:gap-8 overflow-hidden pb-4 px-2">
      {whyChooseList.map((item: IAccordion, index: number) => (
        <BlurCard key={item.id} translateY={[50, 0]} delay={index * 100}>
          <div
            ref={(el: any) => {
              refs.current[`question${item.id}`] = el;
            }}
            className={cn(
              "rounded-2xl overflow-hidden border border-natural-400 hover:shadow-lg hover:shadow-natural-400/30 duration-300",
              submenuOpen[`question${item.id}`]
                ? "bg-white-300"
                : "bg-transparent"
            )}
          >
            <button
              className="p-4 md:p-6 w-full flex items-start gap-6 cursor-pointer"
              onClick={() => handleDropdown(`question${item.id}`)}
            >
              <span className="flex-1 text-left text-xl md:text-2xl lg:text-3xl font-barlow font-black uppercase">
                {item.question}
              </span>
              <div className="shrink-0 size-8 border border-natural-200 rounded-full flex items-center justify-center">
                <ArrowDownIcon
                  className={cn(
                    "text-natural-950 duration-500",
                    submenuOpen[`question${item.id}`] ? "rotate-180" : ""
                  )}
                />
              </div>
            </button>

            <div
              className="transition-all duration-500 ease-in-out"
              style={{
                maxHeight: submenuOpen[`question${item.id}`]
                  ? `${refs.current[`question${item.id}`]?.scrollHeight}px`
                  : "0",
              }}
            >
              <div className="p-4 md:p-6 pt-0 overflow-hidden">
                <p className="text-base md:text-xl lg:text-2xl text-text-700">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        </BlurCard>
      ))}
    </div>
  );
}
