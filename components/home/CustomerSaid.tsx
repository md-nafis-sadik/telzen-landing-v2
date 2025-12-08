import { appStrings, images, QuoteIcon, testimonials } from "@/service";
import Image from "next/image";
import BlurText from "../animation/BlurText";
import DynamicCarousel from "../shared/DynamicCarousel";
import Rating from "../shared/Rating";

function CustomerSaid() {
  return (
    <section className="py-10 md:py-16 lg:py-20 bg-primary-black text-white" id="reviews">
      <div className="containerX !max-w-[1030px] text-center">
        <div className="overflow-y-clip pb-2 mb-10 md:mb-12 lg:mb-16">
          <h2 className="title text-primary-500">
            <BlurText text={appStrings.customerSaidAbout} translateY={[50, 0]} />
          </h2>
        </div>
      </div>
      <DynamicCarousel
        options={{
          loop: true,
          align: "center",
        }}
        playOnInit={true}
      >
        <div className="flex">
          {testimonials?.map((item, index) => (
            <div
              key={index}
              className="flex-[0_0_70%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 select-none"
            >
              <div className="embla-slide-inner border border-natural-500 p-6 rounded-3xl transition-colors duration-200 h-full flex flex-col justify-between gap-3">
                <div>
                  <p className="text-lg md:text-xl lg:text-2xl line-clamp-5">
                    {item?.quote}
                  </p>
                  <QuoteIcon className="size-7 lg:size-10 text-natural-400 ml-auto" />
                  <div className="flex items-center gap-1">
                    <Rating
                      rating={item?.rating}
                      wrapperClass="gap-1"
                      className="rating size-8"
                    />
                    <span className="text-sm sm:text-base font-bold">
                      {item?.rating}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2.5">
                  <Image
                    src={item?.user?.image_url || images.avatar}
                    alt="user"
                    className="size-10 rounded-full"
                    width={100}
                    height={100}
                  />
                  <div className="">
                    <h2 className="text-lg md:text-xl lg:text-2xl font-barlow font-black uppercase leading-[88%] mb-1">
                      {item?.user?.name}
                    </h2>
                    <p className="text-sm md:text-base lg:text-lg designation">
                      {item?.user?.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DynamicCarousel>
    </section>
  );
}

export default CustomerSaid;
