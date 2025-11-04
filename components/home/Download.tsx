import { appStrings, images, routes } from "@/service";
import Image from "next/image";
import Link from "next/link";
import BlurCard from "../animation/BlurCard";
import BlurText from "../animation/BlurText";

function Download() {
  return (
    <section className="py-10 md:py-16 lg:py-20 bg-white">
      <div className="containerX">
        <div className="flex flex-col-reverse lg:flex-row gap-6 text-center lg:text-left items-center bg-secondary-200 pb-10 md:pb-16 lg:pb-20 pt-28 px-6 md:px-10 rounded-3xl">
          <div className="w-full max-w-[600px]">
            <h2 className="text-5xl md:text-6xl xl:text-7xl font-black tracking-[-2px] text-text-950 uppercase font-barlow leading-[100%]">
              {/* {appStrings.downloadTelzenApp} */}
              <BlurText
                text={appStrings.downloadTelzenApp}
                translateX={[-50, 0]}
                className="tracking-[-2px]"
              />
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-text-700 mt-3 md:mt-6">
              <BlurText text={appStrings.youCanGetDesc} />{" "}
              <BlurText
                text={appStrings.telzen}
                className="text-text-950 font-semibold"
              />{" "}
              <BlurText text={appStrings.onGooglePlayDesc} delay={40} />
            </p>
            <div className="flex justify-center lg:justify-start gap-3 md:gap-6 mt-4 flex-wrap">
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
          <div className="max-w-max mx-auto lg:mx-0 lg:ml-auto">
            <div className="max-w-[400px] xl:w-[480px] relative">
              <BlurCard>
                <Image
                  src={images.downloadBg}
                  alt="download background"
                  width={500}
                  height={260}
                  className="w-full rounded-xl"
                />
              </BlurCard>
              <BlurCard scale={[0.8, 1]} delay={500}>
                <Image
                  src={images.handMobile}
                  alt="download background"
                  width={500}
                  height={260}
                  className="w-full max-w-2/3 absolute bottom-0 left-1/2 transform -translate-x-1/2"
                />
              </BlurCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Download;
