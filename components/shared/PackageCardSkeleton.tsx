"use client";

function PackageCardSkeleton() {
  return (
    <div className="flex gap-3 bg-text-100 p-4 rounded-2xl w-full animate-pulse">
      <div className="flex flex-col w-full gap-3">
        <div className="w-6 md:w-7 lg:w-8 h-6 md:h-7 lg:h-8 bg-gray-300 rounded"></div>
        <div className="flex flex-col gap-1">
          <div className="h-6 md:h-7 lg:h-8 bg-gray-300 rounded w-3/4"></div>
          <div className="flex items-center gap-1">
            <div className="w-4 md:w-5 lg:w-6 h-4 md:h-5 lg:h-6 bg-gray-300 rounded"></div>
            <div className="h-4 md:h-5 bg-gray-300 rounded w-20"></div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end justify-end">
        <div className="h-8 md:h-9 lg:h-10 bg-gray-300 rounded w-16"></div>
      </div>
    </div>
  );
}

export default PackageCardSkeleton;
