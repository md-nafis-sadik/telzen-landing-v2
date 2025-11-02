"use client";
import { ChevronDownIcon, cn, faqData } from "@/service";
import { useRef, useState } from "react";

function Faq() {
  const refs = useRef<Record<string, HTMLDivElement | null>>({});
  const [submenuOpen, setSubmenuOpen] = useState<Record<string, boolean>>({});

  const handleDropdown = (menu: string) => {
    setSubmenuOpen((prev) => ({
      [menu]: !prev[menu],
    }));
  };

  return (
    <section
      className="py-10 md:pb-20 lg:pb-7xl md:pt-16 lg:pt-20"
      id={faqData.id}
    >
      <div className="containerX">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12">
          <div className="w-full xl:max-w-[36rem] flex flex-col gap-4 xl:h-[34.125rem]">
            <div className="tag">{faqData.tag}</div>
            <h2 className="title">{faqData.title}</h2>
            <p className="flex-1 text-base md:text-lg lg:text-xl text-black-700">
              {faqData.description}
            </p>
            <p className="text-base md:text-lg lg:text-xl text-black-700 mt-4 xl:mt-0">
              {faqData.contactBtnText}
            </p>
            <button
              type="button"
              className="btn bg-main-500 text-white font-bold px-6 py-3.5 max-w-max"
            >
              {faqData.contactBtnTitle}
            </button>
          </div>
          <div className="">
            <div className="flex flex-col gap-2 sm:gap-3">
              {faqData.faqs.map((item, index) => (
                <div
                  className={cn(
                    " rounded-2xl overflow-hidden",
                    submenuOpen[`question${item.id}`]
                      ? "bg-white-300"
                      : "bg-transparent"
                  )}
                  key={index}
                  ref={(el) => {
                    refs.current[`question${item.id}`] = el;
                  }}
                >
                  <button
                    className="p-4 sm:p-6 w-full flex items-center justify-between gap-6 pb-2.5 cursor-pointer"
                    onClick={() => handleDropdown(`question${item.id}`)}
                  >
                    <span
                      className={cn(
                        "truncate text-base sm:text-lg",
                        submenuOpen[`question${item.id}`]
                          ? "text-black-800 font-bold"
                          : "text-black-700"
                      )}
                    >
                      {item?.question}
                    </span>
                    <ChevronDownIcon
                      className={cn(
                        "shrink-0 duration-300",
                        submenuOpen[`question${item.id}`]
                          ? "rotate-180 text-black-800"
                          : "rotate-0 text-black-600"
                      )}
                    />
                  </button>
                  <div
                    className="transition-all duration-500 ease-in-out"
                    style={{
                      maxHeight: submenuOpen[`question${item.id}`]
                        ? `${
                            refs.current[`question${item.id}`]?.scrollHeight
                          }px`
                        : "0",
                    }}
                  >
                    <div className="p-4 sm:p-6 pt-1 overflow-hidden">
                      <p className=" text-base sm:text-lg text-black-600 leading-[140%] ">
                        {item?.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Faq;
