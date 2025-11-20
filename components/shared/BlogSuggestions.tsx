"use client";

import useEmblaCarousel from "embla-carousel-react";
import { timestampDisplay } from "@/lib/apiHandler";
import BlogCard from "../blog/BlogCard";
import { cn } from "@/service";

interface IFProps {
  data?: any[];
  className?: string;
}

const BlogSuggestions = ({ data, className }: IFProps) => {
  const options = { align: "start", loop: false } as const;
  const [emblaRef] = useEmblaCarousel(options);

  return (
    <div
      className={cn("w-full mt-10 md:mt-20 overflow-hidden", className)}
      ref={emblaRef}
    >
      <div className="w-full min-h-fit flex flex-row gap-6 md:gap-10 py-5 md:py-10">
        {data?.map((item, index) => (
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
  );
};

export default BlogSuggestions;
