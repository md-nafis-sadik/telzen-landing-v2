// import Skeleton from "../shared/Skeleton";

const BlogGallerySkeleton = () => {
  return (
    <section className="containerX my-6 md:my-10 mt-[70px] mb-20 ">
      <div className="flex flex-col md:flex-row gap-6 lg:gap-10 xl:gap-20">
        <div className="w-full lg:w-3/5 flex flex-col gap-7 md:gap-10">
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <div key={index}>
                <div className="h-[360px] md:h-[416px] w-full min-w-[260px] md:min-w-[400px] bg-gray-200 rounded animate-pulse" />
                <div className="h-[42px] md:h-[52px] w-full mt-4 md:mt-6 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
        </div>

        {/* RIGHT PORTION */}
        <div className="w-full lg:w-2/5 flex flex-col gap-8 md:gap-[52px] relative">
          {/* FEATURED */}
          <div className="w-full border border-dashed border-neutral-300 p-6 lg:p-10">
            <p className="title text-5xl font-bold !leading-[0.9] text-black">
              Featured
            </p>

            <hr className="h-[1px] my-6 border border-dashed border-natural-300" />

            <div className="flex flex-col gap-4 md:gap-6">
              {Array(6)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="h-[120px] md:h-[130px] w-full mt-4 bg-gray-200 rounded animate-pulse"
                  />
                ))}
            </div>
          </div>

          {/* CATEGORIES */}
          <div className="w-full border border-dashed border-neutral-300 p-6 lg:p-10 sticky top-10">
            <p className="title text-5xl font-bold !leading-[0.9] text-black">
              Categories
            </p>

            <hr className="h-[1px] my-6 border border-dashed border-natural-300" />

            <div className="flex flex-col gap-4 md:gap-6">
              {Array(3)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="h-[40px] md:h-[50px] w-full mt-4 bg-gray-200 rounded animate-pulse"
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogGallerySkeleton;
