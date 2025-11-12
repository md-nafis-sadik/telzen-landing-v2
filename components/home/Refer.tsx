import { appStrings, images } from "@/service";
import Image from "next/image";
import BlurCard from "../animation/BlurCard";
import BlurText from "../animation/BlurText";

function Refer() {
  return (
    <section className="py-10 md:py-16 lg:py-20 bg-blue-600">
      <div className="containerX">
        <div className="flex flex-col lg:flex-row bg-white pr-0 pb-0 rounded-3xl overflow-hidden">
          <div className="w-full p-10 lg:p-5xl lg:pr-0 text-center lg:text-left">
            <h2 className="text-5xl md:text-6xl xl:text-7xl font-black text-primary-950 uppercase font-barlow leading-[100%]">
              <BlurText
                text={appStrings.referFriend}
                translateX={[-50, 0]}
                className="md:tracking-[-2px]"
                delay={100}
              />
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-black mt-3 md:mt-6 overflow-hidden">
              <BlurText
                translateY={[30, 0]}
                delay={50}
                text={appStrings.inviteYourFriendDesc}
              />
            </p>
          </div>
          <BlurCard
            translateX={[100, 0]}
            scale={[1.2, 1]}
            className="w-full lg:max-w-[730px] flex justify-end items-end"
          >
            <Image
              src={images.peoples}
              alt="peoples"
              width={800}
              height={400}
              className="w-full"
            />
          </BlurCard>
        </div>
      </div>
    </section>
  );
}

export default Refer;
