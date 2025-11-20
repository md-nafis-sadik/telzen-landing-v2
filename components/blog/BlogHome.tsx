"use client";

import useEmblaCarousel from "embla-carousel-react";
import BlogCard from "./BlogCard";
import Link from "next/link";
import { timestampDisplay } from "@/lib/apiHandler";
import { appStrings, ArrowRightBlackSvg, ArrowRightSvg } from "@/service";
import BlurText from "../animation/BlurText";

const OurBlog = ({ data }: any) => {
  const options = { align: "start", loop: false } as const;
  const [emblaRef] = useEmblaCarousel(options);

  return (
    <section className="bg-white flex_center flex-col my-20 w-full">
      <h3 className="title text-text-950 mb-6 md:mb-8 lg:mb-10 overflow-hidden text-center">
        <BlurText
          text={appStrings.blogs}
          translateY={[50, 0]}
          className="md:tracking-[-2px]"
        />
      </h3>
      <div className="containerX w-full overflow-hidden mt-5 md:mt-10">
        <div className="w-full" ref={emblaRef}>
          <div className="w-full min-h-fit flex flex-row gap-6 md:gap-10 py-5 md:py-10">
            {data?.map((item: any, index: number) => (
              <BlogCard
                index={index}
                key={index}
                title={item?.title}
                date={timestampDisplay(item?.publishedAt)}
                image={item?.featuredImage}
                link={`/blog/${item?.title}`}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center w-full">
          <Link className="mt-4 md:mt-8 flex gap-1" href="/blog">
            <span>See More</span>
            <span>
              <ArrowRightBlackSvg />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OurBlog;
