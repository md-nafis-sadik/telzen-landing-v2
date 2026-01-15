import { appStrings, envConfig, images } from "@/service";
import Image from "next/image";
import { memo } from "react";
import BlurCard from "../animation/BlurCard";
import BlurText from "../animation/BlurText";
import Link from "next/link";

function Download() {
  return (
    <section className="py-10 md:py-16 lg:py-20 bg-white">
      <div className="containerX">
        <div className="flex flex-col-reverse lg:flex-row gap-6 text-center lg:text-left items-center bg-secondary-200 pb-10 md:pb-16 lg:pb-20 pt-28 px-6 md:px-10 rounded-3xl">
          <div className="w-full max-w-[600px]">
            <div className="overflow-clip pb-2 px-2 block sm:hidden">
              <h2 className="text-5xl md:text-6xl xl:text-7xl font-black text-text-950 uppercase font-barlow leading-[100%]">
                {/* {appStrings.downloadTelzenApp} */}
                <BlurText
                  text={appStrings.downloadTelzenApp}
                  translateX={[-50, 0]}
                  className="md:tracking-[-2px]"
                />
              </h2>
            </div>
            
              <h2 className="text-5xl md:text-6xl xl:text-7xl font-black text-text-950 uppercase font-barlow leading-[100%] hidden sm:block overflow-hidden">
                {/* {appStrings.downloadTelzenApp} */}
                <BlurText
                  text={appStrings.downloadTelzenApp}
                  translateX={[-50, 0]}
                  className="md:tracking-[-2px]"
                />
              </h2>
            
            <div className="overflow-clip pb-1 px-2">
              <p className="text-lg md:text-xl lg:text-2xl text-text-700 mt-3 md:mt-6">
                <BlurText
                  translateX={[30, 0]}
                  delay={50}
                  text={appStrings.youCanGetDesc}
                />{" "}
                <BlurText
                  translateX={[30, 0]}
                  delay={50}
                  text={appStrings.telzen}
                  className="text-text-950 font-semibold"
                />{" "}
                <BlurText
                  translateX={[30, 0]}
                  delay={50}
                  text={appStrings.onGooglePlayDesc}
                />
              </p>
            </div>
            <div className="flex justify-center lg:justify-start gap-2 mt-4 items-center w-full h-full">
              <BlurCard scale={[0.8, 1]} delay={100} className="h-full sm:h-14">
                <Link
                  href={appStrings.playAppUrl || ""}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  <Image
                    src={images.appStoreDw}
                    alt="app store"
                    width={312}
                    height={120}
                    className="h-full w-auto duration-200"
                    loading="lazy"
                  />
                </Link>
              </BlurCard>
              <BlurCard scale={[0.8, 1]} delay={300} className="h-full sm:h-14">
                <Link
                  href={appStrings.googleAppUrl || ""}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  <Image
                    src={images.googlePlayDw}
                    alt="google play"
                    width={318}
                    height={120}
                    className="h-full w-auto duration-200"
                    loading="lazy"
                  />
                </Link>
              </BlurCard>
            </div>
          </div>
          <div className="max-w-max mx-auto lg:mx-0 lg:ml-auto">
            <div className="max-w-[400px] xl:w-[480px] relative">
              <BlurCard
                filter={["blur(20px)", "blur(0px)"]}
                className="min-h-[280px]"
              >
                <Image
                  src={images.downloadBg}
                  alt="download background"
                  width={500}
                  height={260}
                  className="w-full rounded-xl"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 480px"
                />
              </BlurCard>
              <BlurCard scale={[0.8, 1]} delay={500}>
                <Image
                  src={images.handMobile}
                  alt="download background"
                  width={500}
                  height={260}
                  className="w-full max-w-2/3 absolute bottom-0 left-1/2 transform -translate-x-1/2"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 480px"
                />
              </BlurCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(Download);
