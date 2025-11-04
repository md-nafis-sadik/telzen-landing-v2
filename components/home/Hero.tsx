import { appStrings, images, routes } from "@/service";
import Image from "next/image";
import Link from "next/link";

function Hero() {
  return (
    <section className="py-16">
      <div className="containerX">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-7">
          <div className="text-center md:text-left">
            <div className="title text-black whitespace-nowrap">
              {appStrings.stayOnline}
              <div className="flex items-center justify-center md:justify-start gap-3 flex-wrap md:flex-nowrap">
                <span className="text-primary-700">{appStrings.anywhere}</span>
                <Image
                  src={images?.world}
                  alt="world"
                  className="size-10 md:size-16 lg:size-24"
                  width={150}
                  height={150}
                />
              </div>
            </div>
            <p className="text-xl md:text-2xl lg:text-3xs text-text-700 mt-4 duration-200">
              {appStrings.downloadAppActivateSimDesc}
            </p>

            <p className="text-2xl text-text-700 font-semibold mt-8">
              {appStrings.downloadNow}!
            </p>
            <div className="flex justify-center md:justify-start gap-3 md:gap-6 mt-2 flex-wrap">
              <Link href={routes.home.path}>
                <Image
                  src={images.appStore}
                  alt="app store"
                  width={150}
                  height={50}
                  className="w-32 sm:w-full h-full duration-200"
                />
              </Link>
              <Link href={routes.home.path}>
                <Image
                  src={images.googlePlay}
                  alt="app store"
                  width={150}
                  height={50}
                  className="w-32 sm:w-full h-full duration-200"
                />
              </Link>
            </div>
          </div>
          <div className="relative max-w-96 mx-auto md:max-w-none">
            <Image
              src={images.heroBg}
              alt="hero background"
              width={500}
              height={500}
              className="w-full"
            />

            <Image
              src={images.heroMobile1}
              alt="hero background"
              width={500}
              height={500}
              className="w-1/2 absolute top-0 left-0"
            />

            <Image
              src={images.heroMobile2}
              alt="hero background"
              width={500}
              height={500}
              className="w-3/4 absolute -bottom-4 right-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
