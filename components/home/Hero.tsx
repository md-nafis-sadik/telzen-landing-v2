"use client";
import { appStrings, images } from "@/service";
import Image from "next/image";
import BlurCard from "../animation/BlurCard";
import BlurText from "../animation/BlurText";
import InfiniteBlurCard from "../animation/InfiniteBlurCard";

function Hero() {
  return (
    <section className="lg:min-h-[calc(100vh-73px)] flex items-center justify-center">
      <div className="containerX py-16 lg:py-6">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-7">
          <div className="text-center md:text-left">
            <div className="title text-black whitespace-nowrap">
              <BlurText text={appStrings.stayOnline} translateX={[50, 0]} />
              {/* {appStrings.stayOnline} */}
              <div className="flex items-center justify-center md:justify-start gap-3 flex-wrap md:flex-nowrap">
                <BlurText
                  text={appStrings.anywhere}
                  className="text-primary-700"
                  translateX={[-50, 0]}
                />
                <Image
                  src={images?.world}
                  alt="world"
                  className="size-10 md:size-16 lg:size-24"
                  width={150}
                  height={150}
                />
              </div>
            </div>
            <div className="mt-4 min-h-10 overflow-hidden">
              <BlurText
                text={appStrings.downloadAppActivateSimDesc}
                className="text-xl md:text-2xl lg:text-3xs text-text-700"
                translateY={[40, 0]}
                delay={40}
              />
            </div>

            <BlurText
              text={`${appStrings.downloadNow}`}
              className="text-2xl text-text-700 font-semibold mt-8"
            ></BlurText>
            <div className="flex justify-center md:justify-start gap-3 md:gap-6 mt-2 flex-wrap">
              <BlurCard
                scale={[0.8, 1]}
                delay={100}
                className="w-32 sm:w-40 h-14"
              >
                <a
                  href="https://play.google.com/store/apps/details?id=com.netro.telzenapp&pcampaignid=web_share"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-full"
                >
                  <Image
                    src={images.appStore}
                    alt="app store"
                    width={150}
                    height={50}
                    className="w-full h-full duration-200"
                  />
                </a>
              </BlurCard>
              <BlurCard
                scale={[0.8, 1]}
                delay={300}
                className="w-32 sm:w-40 h-14"
              >
                <a
                  href="https://play.google.com/store/apps/details?id=com.netro.telzenapp&pcampaignid=web_share"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-full"
                >
                  <Image
                    src={images.googlePlay}
                    alt="app store"
                    width={150}
                    height={50}
                    className="w-full h-full duration-200"
                  />
                </a>
              </BlurCard>
            </div>
          </div>
          <div className="relative max-w-96 mx-auto md:max-w-none min-h-[380px]">
            <BlurCard>
              <Image
                src={images.heroBg}
                alt="hero background"
                width={500}
                height={500}
                className="w-full"
              />
            </BlurCard>
            <InfiniteBlurCard
              yoyoAnimate={{ x: [5, -5, 5], y: [5, -5, 5] }}
              yoyoTransition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "mirror",
              }}
              className="w-1/2 !absolute top-0 left-0"
            >
              <Image
                src={images.heroMobile1}
                alt="hero background"
                width={500}
                height={500}
                className="w-full"
              />
            </InfiniteBlurCard>
            <InfiniteBlurCard
              yoyoAnimate={{ x: [5, -5, 5], y: [-5, 5, -5] }}
              yoyoTransition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "mirror",
              }}
              className="w-3/4 !absolute -bottom-4 right-0"
            >
              <Image
                src={images.heroMobile2}
                alt="hero background"
                width={500}
                height={500}
                className="w-full"
              />
            </InfiniteBlurCard>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
