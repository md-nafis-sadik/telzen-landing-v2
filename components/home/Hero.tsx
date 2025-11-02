import { bannerData } from "@/service";
import Image from "next/image";

function Hero() {
  return (
    <div
      className="bg-blue-900 -mt-[5.375rem] pb-10 md:pb-0 pt-32 md:pt-36 lg:pt-[10.375rem] relative"
      id={bannerData.id}
    >
      <div className="containerX relative z-40 text-white">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-x-6 gap-y-10">
          <div className="w-full sm:max-w-[40rem] lg:max-w-[38.75rem] text-center md:text-start">
            <h1 className="text-3xl sm:text-5xl xl:text-7xl font-bold leading-[115%] tracking-[-0.046rem]">
              {bannerData.titles[0]}{" "}
              <span className="text-yellow-300">{bannerData.titles[1]}</span>
            </h1>
            <div className="flex justify-center md:justify-start -space-x-3 mt-4 md:mt-6 lg:mt-8">
              <div className="w-10 md:w-12 lg:w-14 aspect-square rounded-full bg-main-500"></div>
              <div className="w-10 md:w-12 lg:w-14 aspect-square rounded-full bg-white"></div>
            </div>
          </div>
          <div className="w-full xs:max-w-[26.25rem]">
            <p className="text-lg md:text-xl lg:text-2xl text-center md:text-start">
              {bannerData.description}
            </p>
            <div className="flex flex-col lg:flex-row gap-3 mt-6 md:mt-8 lg:mt-12">
              <a
                href={`tel:${bannerData.contacts[0]}`}
                className="btn gap-3 bg-main-500 pl-2 pr-12 py-2 font-inter rounded-xl lg:rounded-2xl"
              >
                {bannerData.phoneIcon}
                <p className="flex flex-col font-bold text-sm md:text-base xl:text-xl leading-[120%]">
                  <span>{bannerData.contacts[0]}</span>
                  <span>{bannerData.contacts[1]}</span>
                </p>
              </a>
              <button
                type="button"
                className="btn border border-white rounded-xl lg:rounded-2xl py-2.5 lg:py-4 pl-4 pr-5"
              >
                {bannerData.playIcon}
                <span>{bannerData.demoTitle}</span>
              </button>
            </div>
          </div>
        </div>
        <div className="mt-10 lg:mt-16 md:h-96 xl:h-[35.625rem] w-full relative md:p-6 lg:p-8 flex md:items-end justify-center md:justify-end">
          <Image
            src={bannerData.banner}
            alt="banner"
            width={1200}
            height={600}
            className="absolute top-0 left-0 w-full h-full object-cover rounded-t-2xl hidden md:block"
          />
          <div className="flex flex-col gap-6 lg:gap-8 py-4 md:py-6 lg:py-8 px-5 md:px-7 lg:px-10 bg-main-500 relative w-full max-w-[26.25rem] lg:max-w-[22.5rem] rounded-2xl max-h-max -mb-28 md:mb-0">
            {bannerData.services.map((service, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-10 md:w-12 lg:w-[3.75rem] aspect-square flex items-center justify-center bg-white rounded-full shrink-0">
                  {service.icon}
                </div>
                <div>
                  <p className="text-lg md:text-2xl lg:text-3xl font-bold leading-[130%]">
                    {service.title}
                  </p>
                  <p className="text-sm md:text-lg lg:text-xl font-medium text-main-100 leading-[130%] md:mt-2">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Image
        src={bannerData.bannerBg}
        alt="banner bg"
        width={1200}
        height={600}
        className="absolute top-0 left-0 w-full h-full object-cover bg-top"
        priority
      />
    </div>
  );
}

export default Hero;
