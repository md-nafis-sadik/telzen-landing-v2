import { cn } from "@/service";

function PageThumbnail({
  title,
  description,
  titleClassName = "blackGradient",
  className = "",
}: {
  title?: string;
  description?: string;
  titleClassName?: string;
  className?: string;
}) {
  return (
    <div className={cn("containerX", className)}>
      <div className="pt-8 md:pt-10 lg:pt-12 pb-5 sm:pb-7 md:pb-8">
        <h1 className={cn("title", titleClassName)}>{title}</h1>
        <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-text-600 font-inter font-normal md:font-light uppercase leading-[140%]">
          {description}
        </p>
      </div>
    </div>
  );
}

export default PageThumbnail;
