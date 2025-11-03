import { appStrings, images, QuoteIcon } from "@/service";
import Image from "next/image";
import DynamicCarousel from "../shared/DynamicCarousel";

function CustomerSaid() {
  return (
    <section className="py-10 md:py-16 lg:py-20 bg-primary-black text-white">
      <div className="containerX !max-w-[1030px] text-center">
        <h2 className="title text-primary-500 mb-6 md:mb-8 lg:mb-10">
          {appStrings.customerSaidAbout}
        </h2>
      </div>
      <DynamicCarousel
        options={{
          loop: true,
          align: "center",
        }}
      >
        <div className="flex">
          {Array(9)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="flex-[0_0_40%] min-w-0 select-none">
                <div className="embla-slide-inner border border-natural-500 p-6 rounded-3xl">
                  <p className="text-2xl line-clamp-5">
                    &quot;As a frequent business traveler, reliable connectivity
                    is a must, and Simly delivers. Setting up the eSlM was
                    quick, and I could stay connected during back-to-back trips
                    in multiple countries.&quot;{" "}
                  </p>
                  <QuoteIcon className="size-10 text-natural-400 ml-auto" />
                  <div className="flex gap-2.5 mt-6">
                    <Image
                      src={images.user1}
                      alt="user"
                      className="size-10 rounded-full"
                      width={100}
                      height={100}
                    />
                    <div className="">
                      <h2 className="text-2xl font-barlow font-black uppercase leading-[88%] mb-1">
                        Daniel A. Rivera
                      </h2>
                      <p className="text-lg designation">Art Detector</p>
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
