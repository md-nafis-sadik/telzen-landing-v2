"use client";
import { appStrings, cn, faqData, MinusIcon, PlusIcon } from "@/service";
import { useRef, useState } from "react";
import BlurCard from "../animation/BlurCard";
import BlurText from "../animation/BlurText";

function Faq() {
  const refs = useRef<Record<string, HTMLDivElement | null>>({});
  const [submenuOpen, setSubmenuOpen] = useState<Record<string, boolean>>({});

  const handleDropdown = (menu: string) => {
    setSubmenuOpen((prev) => ({
      [menu]: !prev[menu],
    }));
  };

  return (
    <section className="py-10 md:py-16 lg:py-20 bg-red-900 text-white">
      <div className="containerX">
        <div className="w-full max-w-[776px] mx-auto">
          <h2 className="title text-center tracking-[-2px] overflow-hidden">
            <BlurText text={appStrings.faq} translateY={[50, 0]} />
          </h2>
          <div className="flex flex-col gap-6 sm:gap-8 mt-8 md:mt-12 lg:mt-16">
            {faqData.map((item, index) => (
              <BlurCard
                translateY={[50, 0]}
                delay={index * 100}
                className={cn(
                  " rounded-2xl overflow-hidden",
                  submenuOpen[`question${item.id}`]
                    ? "bg-white-300"
                    : "bg-transparent"
                )}
                key={index}
                ref={(el: any) => {
                  refs.current[`question${item.id}`] = el;
                }}
              >
                <button
                  className="py-4 w-full flex items-center justify-between gap-6 pb-2.5 cursor-pointer"
                  onClick={() => handleDropdown(`question${item.id}`)}
                >
                  <span className="truncate text-base sm:text-lg md:text-2xl lg:text-3xl font-barlow font-black uppercase">
                    {item?.question}
                  </span>
                  {submenuOpen[`question${item.id}`] ? (
                    <MinusIcon className="shrink-0 duration-300" />
                  ) : (
                    <PlusIcon className="shrink-0 duration-300" />
                  )}
                </button>
                <div
                  className="transition-all duration-500 ease-in-out"
                  style={{
                    maxHeight: submenuOpen[`question${item.id}`]
                      ? `${refs.current[`question${item.id}`]?.scrollHeight}px`
                      : "0",
                  }}
                >
                  <div className="pt-1 overflow-hidden">
                    <p className=" text-base sm:text-lg text-black-600 leading-[140%] ">
                      {item?.answer}
                    </p>
                  </div>
                </div>
              </BlurCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Faq;
