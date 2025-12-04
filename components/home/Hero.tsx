"use client";

import React, { useState, memo } from "react";
import { useRouter } from "next/navigation";
import {
  AppStoreSvg,
  appStrings,
  envConfig,
  GooglePlaySvg,
  images,
} from "@/service";
import Image from "next/image";
import AnimateCard from "../animation/AnimateCard";
import BlurText from "../animation/BlurText";
import SearchInput from "../shared/SearchInput";
import Link from "next/link";

function Hero() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(
        `/destinations?search=${encodeURIComponent(searchQuery.trim())}`
      );
    } else {
      router.push("/destinations");
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };
  return (
    <section className="lg:min-h-[calc(100vh-73px)] flex items-center justify-center">
      <div className="containerX py-16 lg:py-6">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-7">
          <div className="text-center md:text-left">
            <div className="title text-black whitespace-nowrap">
              <div className="overflow-hidden">
                <BlurText text={appStrings.stayOnline} translateY={[50, 0]} />
              </div>
              {/* {appStrings.stayOnline} */}
              <div className="flex items-center justify-center md:justify-start gap-3 flex-wrap md:flex-nowrap">
                <div className="overflow-hidden">
                  <BlurText
                    text={appStrings.anywhere}
                    // className="text-primary-700"
                    translateX={[-50, 0]}
                    delay={400}
                  />
                </div>
                {/* <AnimateCard scale={[0.9, 1]} delay={600}>
                  <Image
                    src={images?.world}
                    alt="world"
                    className="size-10 md:size-16 lg:size-24"
                    width={150}
                    height={150}
                    priority
                  />
                </AnimateCard> */}
              </div>
            </div>
            <div>
              <div className="w-full max-w-[360px] my-4 lg:my-8">
                <SearchInput
                  placeholder="Search destinations..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onSearch={handleSearch}
                />
              </div>
            </div>
            {/* <div className="mt-4 min-h-10 overflow-hidden">
              <p className="text-xl md:text-2xl lg:text-3xs text-text-700">
                {appStrings.downloadAppActivateSimDesc}
              </p>
            </div> */}

            <p className="text-lg lg:text-xl text-text-700 mt-8">
              {appStrings.downloadNow}
            </p>
            <div className="flex justify-center md:justify-start gap-3 md:gap-6 mt-2 flex-wrap">
              <Link
                href={envConfig.playAppUrl || ""}
                target="_blank"
                rel="noopener noreferrer"
              >
                <AppStoreSvg />
              </Link>
              <Link
                href={envConfig.googleAppUrl || ""}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GooglePlaySvg />
              </Link>
            </div>
          </div>
          <div className="relative max-w-96 mx-auto md:max-w-none min-h-[380px]">
            <Image
              src={images.heroBg}
              alt="hero background"
              width={500}
              height={500}
              className="w-full"
              priority
              sizes="(max-width: 768px) 384px, 500px"
            />
            <AnimateCard
              scale={[0.95, 1]}
              className="w-1/2 !absolute top-0 left-0 z-10"
            >
              <Image
                src={images.heroMobile1}
                alt="hero background"
                width={500}
                height={500}
                className="w-full z-10"
                priority
                sizes="(max-width: 768px) 192px, 250px"
              />
            </AnimateCard>
            <AnimateCard
              scale={[0.95, 1]}
              delay={500}
              className="w-3/4 !absolute -bottom-4 right-0 z-40"
            >
              <Image
                src={images.heroMobile2}
                alt="hero background"
                width={500}
                height={500}
                className="w-full  z-10"
                priority
                sizes="(max-width: 768px) 288px, 375px"
              />
            </AnimateCard>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(Hero);
