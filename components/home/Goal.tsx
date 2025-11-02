import { CheckCircleIcon, goalData } from "@/service";
import Image from "next/image";

function Goal() {
  return (
    <section className="py-10 md:py-20 lg:py-7xl" id={goalData.id}>
      <div className="containerX">
        <div className="tag mx-auto">{goalData.tag}</div>
        <h2 className="title text-center mt-6">{goalData.title}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12 mt-12">
          <div className="order-2 sm:order-1">
            <p className="text-2xl text-black-900 font-semibold mb-6">
              {goalData.goal.title}
            </p>
            <p className="text-base text-black-700">
              {goalData.goal.description}
            </p>
            <button
              type="button"
              className="btn w-full sm:max-w-48 bg-main-500 text-white font-bold px-5 py-3.5 mt-6 mb-2 sm:mb-4 rounded-2xl "
            >
              {goalData.goal.driverAppBtnTitle}
            </button>
            <button
              type="button"
              className="btn w-full sm:max-w-max bg-black text-white font-bold px-5 py-3.5 rounded-2xl "
            >
              {goalData.goal.retailerAppBtnTitle}
            </button>
          </div>
          <div className="2xl:px-10 order-2 hidden lg:block">
            <Image
              src={goalData.image}
              alt="goal image"
              width={600}
              height={800}
              className="w-full rounded-3xs"
            />
          </div>
          <div className="flex flex-col lg:justify-end order-1 sm:order-2 lg:order-3">
            <p className="text-2xl text-black-900 font-semibold mb-4 sm:mb-6">
              {goalData.purpose.title}
            </p>
            <ul className="flex flex-col gap-4 lg:gap-6">
              {goalData.purpose.services.map((item, index) => (
                <li
                  className="flex items-center gap-2 lg:gap-4 text-base text-black-700"
                  key={index}
                >
                  <CheckCircleIcon className="w-5 sm:w-6 text-main-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Goal;
