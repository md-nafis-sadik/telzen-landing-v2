import { aboutData, CheckCircleIcon } from "@/service";
import images from "@/service/assets/images.assets";

function About() {
  return (
    <section className="py-10 md:py-20 lg:py-7xl" id={aboutData.id}>
      <div className="containerX">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="tag">{aboutData.tag}</div>
          <p className="w-full md:max-w-[59.0625rem] text-base md:text-lg lg:text-2xl xl:text-4xs leading-[130%] text-black-800">
            {aboutData.description}
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-6 mt-6 md:mt-8 lg:mt-12">
          <div className="p-5 md:p-6 lg:p-8 bg-yellow-300 w-full md:max-w-80 lg:max-w-[27.5rem] rounded-3xs flex flex-col justify-between">
            <p className="text-lg md:text-xl lg:text-2xl font-bold text-black-900">
              {aboutData.whyEasy.title}
            </p>
            <div className="grid grid-cols-2 gap-6 lg:gap-8 mt-4 md:mt-6 lg:mt-8">
              {aboutData.whyEasy.counts.map((item, index) => (
                <div className="flex flex-col gap-2" key={index}>
                  <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-black-900 leading-[100%]">
                    {item?.count}
                  </p>
                  <p className="text-base md:text-lg lg:text-xl text-black-900/60 leading-[120%]">
                    {item?.title}
                  </p>
                </div>
              ))}
            </div>
            <ul className="flex flex-col gap-2.5 mt-6 lg:mt-8">
              {aboutData.whyEasy.services.map((item, index) => (
                <li
                  className="flex items-center gap-2 md:gap-4 text-sm md:text-base text-black-700"
                  key={index}
                >
                  <CheckCircleIcon className="w-5 md:w-6 shrink-0 text-main-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="btn bg-black text-white text-base font-bold px-5 py-3.5 rounded-2xl mt-6 lg:mt-8"
            >
              {aboutData.whyEasy.buttonText}
            </button>
          </div>
          <div
            className="w-full relative flex items-end h-60 sm:h-86 md:h-auto p-4 lg:p-6"
            style={{
              backgroundImage: `url("${images.about}")`,
              backgroundSize: "cover",
              backgroundPosition: "top",
              borderRadius: "20px",
            }}
          >
            <div className="w-full max-w-max lg:max-w-[38.25rem] flex gap-3 p-4 lg:px-8 xl:px-10 lg:py-8 bg-main-500 rounded-2xl text-white">
              <div className="w-10 h-10 md:w-12 md:h-12 lg:w-5xl lg:h-5xl aspect-square flex items-center justify-center bg-white rounded-full">
                {aboutData.icon}
              </div>
              <p className="text-base sm:text-lg lg:text-2xl xl:text-3xs font-bold leading-[130%] -tracking-[0.0175rem] md:whitespace-pre-wrap">
                {aboutData.bannerTitle}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
