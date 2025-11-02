import { appdownloadData } from "@/service";
import Image from "next/image";

function Download() {
  return (
    <section className="bg-blue-900 overflow-hidden">
      <div className="w-full lg:max-w-[120rem] mx-auto px-5 md:px-10 lg:pl-14 xl:pl-20 flex flex-col lg:flex-row items-center lg:items-end justify-between">
        <div className="w-full py-10 lg:py-16 text-center lg:text-start">
          <p className="text-xl md:text-2xl lg:text-4xs text-yellow-300 font-bold leading-[130%]">
            {appdownloadData.subTitle}
          </p>
          <h2 className="title !text-white">{appdownloadData.title}</h2>
          <p className="text-base md:text-lg font-medium text-white lg:whitespace-pre-wrap mt-2">
            {appdownloadData.description}
          </p>
          <div className="w-full flex flex-col xs:flex-row justify-center lg:justify-start gap-4 mt-6">
            <button
              type="button"
              className="btn w-full xs:max-w-48 bg-main-500 text-sm lg:text-base text-white font-bold px-3 md:px-5 py-3.5 rounded-2xl"
            >
              {appdownloadData.driverAppBtnTitle}
            </button>
            <button
              type="button"
              className="btn w-full xs:max-w-max bg-black text-sm lg:text-base text-white font-bold px-3 md:px-5 py-3.5 rounded-2xl"
            >
              {appdownloadData.retailerAppBtnTitle}
            </button>
          </div>
        </div>
        <Image
          src={appdownloadData.image}
          alt="app download data"
          width={1024}
          height={800}
          className="lg:max-w-[30rem] xl:max-w-[37.25rem] lg:-mt-8"
        />
      </div>
    </section>
  );
}

export default Download;
