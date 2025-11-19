import { images, MobileWithStarsSvg } from "@/service";
import BlurText from "../animation/BlurText";

import BigToggleSwitch from "../shared/BigToggleSwitch";
import Image from "next/image";

function MyEsimComponent() {
  const items = Array.from({ length: 15 }, (_, i) => i);
  return (
    <section
      className="py-10 md:py-16 lg:py-20 bg-natural-50 lg:min-h-screen flex"
      id="allDestinations"
    >
      <div className="w-full">
        <div className="containerX">
          <h2 className="backTitle text-text-950">
            <BlurText text="my esim" translateY={[50, 0]} />
          </h2>
          <div className="bg-secondary-100 flex items-center gap-3 px-14 py-5 rounded-full mt-8">
            <span>
              <MobileWithStarsSvg />
            </span>
            <span className="text-[#FF9F20]">
              For best experience we recomend to use our app.
            </span>
          </div>
          <div className="w-full flex flex-col-reverse gap-4 lg:flex-row items-center justify-between my-6 md:my-7 lg:my-8">
            <BigToggleSwitch
              firstbuttonText="My Plans"
              secondbuttonText="Buy Another"
            />
          </div>
          <div className="flex flex-col gap-6">
            <div className="bg-white w-full flex flex-col lg:flex-row rounded-xl border border-natural-200">
              <div className="hidden lg:flex w-[348px] h-[185px]">
                <Image
                  src={images?.newZealand}
                  alt="world"
                  width={384}
                  height={185}
                  priority
                  className="rounded-l-xl object-cover object-bottom"
                />
              </div>
              <div className="flex lg:hidden w-full h-[200px] relative">
                <Image
                  src={images?.newZealand}
                  alt="world"
                  fill
                  priority
                  className="rounded-t-xl object-cover"
                />
              </div>

              <div className="p-4 flex flex-col lg:flex-row justify-between items-center gap-4 w-full">
                <div className="flex flex-col gap-4 text-center lg:text-left">
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-1 justify-center lg:justify-start">
                      <Image
                        src={images.germany}
                        alt="country"
                        width={100}
                        height={100}
                        className="size-6 object-fill"
                      />
                      <span>GERMANY</span>
                    </div>
                    <div>226444522994461229</div>
                  </div>
                  <div className="flex gap-4 text-lg lg:text-xl font-semibold">
                    <div className="">1 GB • 7 Days </div>
                    <div>
                      <span className="font-normal text-base lg:text-lg text-text-700 mr-1">
                        Expires:
                      </span>{" "}
                      12 Aug, 2024
                    </div>
                  </div>
                  <div className="text-xl md:text-[32px] font-extrabold text-primary-700 font-barlow uppercase">
                    Balance: 985MB
                  </div>
                </div>
                <div className="flex">
                  <span className="p-3 border border-natural-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="111"
                      height="111"
                      viewBox="0 0 111 111"
                      fill="none"
                    >
                      <path
                        d="M55.4462 12.9952V21.6587H46.7827V12.9952H55.4462ZM46.7827 63.893V76.2385H55.4462V63.893H46.7827ZM72.7731 110.892V102.229H64.1096V93.5654H55.4462V110.892H72.7731ZM90.1 46.5661H64.1096V55.2296H90.1V46.5661ZM90.1 63.893H102.229V55.2296H90.1V63.893ZM90.1 76.2385V84.9019H110.892V63.893H102.229V76.2385H90.1ZM64.1096 0H55.4462V12.9952H64.1096V0ZM55.4462 38.9856H64.1096V21.6587H55.4462V30.3221H46.7827V55.2296H55.4462V38.9856ZM0 46.5661V63.893H8.66346V55.2296H21.6587V46.5661H0ZM64.1096 63.893V55.2296H55.4462V63.893H64.1096ZM81.4365 72.5565H90.1V63.893H81.4365V72.5565ZM102.229 55.2296H110.892V46.5661H102.229V55.2296ZM72.7731 63.893H64.1096V76.2385H55.4462V84.9019H72.7731V63.893ZM46.7827 93.5654H55.4462V84.9019H46.7827V93.5654ZM72.7731 84.9019V93.5654H90.1V84.9019H72.7731ZM98.7635 102.229V93.5654H90.1V102.229H98.7635ZM110.892 110.892V102.229H98.7635V110.892H110.892ZM81.4365 110.892H90.1V102.229H81.4365V110.892ZM38.9856 55.2296V46.5661H30.3221V55.2296H21.6587V63.893H46.7827V55.2296H38.9856ZM38.9856 38.9856H0V0H38.9856V38.9856ZM30.3221 8.66346H8.66346V30.3221H30.3221V8.66346ZM23.8245 15.1611H15.1611V23.8245H23.8245V15.1611ZM110.892 0V38.9856H71.9067V0H110.892ZM102.229 8.66346H80.5702V30.3221H102.229V8.66346ZM95.7312 15.1611H87.0678V23.8245H95.7312V15.1611ZM0 71.9067H38.9856V110.892H0V71.9067ZM8.66346 102.229H30.3221V80.5702H8.66346V102.229ZM15.1611 95.7312H23.8245V87.0678H15.1611V95.7312Z"
                        fill="black"
                      />
                    </svg>
                  </span>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                    >
                      <path
                        d="M11 14.1163L5.5 8.61634L6.78333 7.33301L11 11.5497L15.2167 7.33301L16.5 8.61634L11 14.1163Z"
                        fill="#1D1B20"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MyEsimComponent;
