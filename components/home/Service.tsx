import { serviceData } from "@/service";

function Service() {
  return (
    <section className="py-10 md:py-20 lg:py-7xl" id={serviceData.id}>
      <div className="containerX">
        <div className="tag mx-auto">{serviceData.tag}</div>
        <h2 className="title text-center mt-4 md:mt-6">{serviceData.title}</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 xl:gap-8 mt-8 md:mt-10 lg:mt-14">
          {serviceData.services.map((item, index) => (
            <div
              className="border border-neutral-200 rounded-2xl min-h-48 md:min-h-56 lg:min-h-[15.625rem] flex flex-col justify-between p-6 xl:p-10 w-full max-w-96 md:max-w-none mx-auto sm:last:col-span-2 md:last:col-span-1"
              key={index}
            >
              <div className="w-12 lg:w-5xl aspect-square rounded-lg bg-white-100 flex items-center justify-center">
                {item?.icon}
              </div>
              <p className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-black">
                {item?.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Service;
