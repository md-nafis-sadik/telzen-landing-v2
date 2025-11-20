// import { cn } from "@/lib/utils";
import { cn } from "@/service";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface IFCardProps {
  image: string | StaticImageData;
  index: number;
  title?: string;
  link: string;
  date?: string;
  imageContainerClassName?: string;
  className?: string;
  titleClassName?: string;
  contentContainerClassName?: string;
}

const BlogCard = ({
  image,
  index,
  title,
  link,
  date,
  imageContainerClassName,
  className,
  titleClassName,
  contentContainerClassName,
}: IFCardProps) => {
  return (
    <div
      // index={index}
      // duration={0.5}
      // startAnim={100}
      className={cn("w-full group", className)}
    >
      <div
        className={cn(
          "w-full relative overflow-hidden min-w-[260px] md:min-w-[400px] aspect-[16/9]",
          imageContainerClassName
        )}
      >
        <Image
          src={image}
          alt="Blog 1"
          className="w-full h-full object-cover absolute_center transition_common group-hover:scale-105"
          width={1280}
          height={720} // 16:9 ratio
        />
      </div>

      <Link
        href={link}
        className={cn("block pt-4 md:pt-6 w-full", contentContainerClassName)}
      >
        <p
          className={cn(
            "text-lg md:text-2xl !leading-normal md:!leading-[1.16] font-bold text-natural-700 font-inter",
            titleClassName
          )}
        >
          {title}
        </p>

        <p
          className={cn(
            "text-sm font-normal !leading-[1.1] text-natural-700 mt-2 md:mt-3 font-inter"
          )}
        >
          {date}
        </p>
      </Link>
    </div>
  );
};

export default BlogCard;
