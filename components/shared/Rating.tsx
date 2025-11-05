import { cn, StarHalfSvg, StarOutlineSvg, StarSvg } from "@/service";

function Rating({ rating = 0, wrapperClass = "", ...rest }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.1;
  const totalStars = 5;

  return (
    <div className={cn("flex items-center", wrapperClass)}>
      {[...Array(totalStars)].map((_, index) => {
        if (index < fullStars) {
          return <StarSvg key={index} {...rest} />;
        } else if (index === fullStars && hasHalfStar) {
          return <StarHalfSvg key={index} {...rest} />;
        } else {
          return <StarOutlineSvg key={index} {...rest} />;
        }
      })}
    </div>
  );
}

export default Rating;
