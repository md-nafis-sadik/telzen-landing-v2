"use client";

import React from "react";
import BlogSuggestions from "@/components/shared/BlogSuggestions";
import { timestampDisplay } from "@/lib/apiHandler";
import BlogCard from "./BlogCard";
import {
  useGetAllBlogsQuery,
  useGetBlogCategoriesQuery,
  useGetFeaturedBlogsQuery,
  useGetRecentBlogsQuery,
} from "@/store/modules/blog/blogApi";

const BlogGalleryClient = () => {
  const { data: blogsResponse, isLoading: blogsLoading } =
    useGetAllBlogsQuery();
  const { data: categoriesResponse, isLoading: categoriesLoading } =
    useGetBlogCategoriesQuery();
  const { data: featuredBlogsResponse, isLoading: featuredLoading } =
    useGetFeaturedBlogsQuery();
  const { data: recentBlogsResponse, isLoading: recentLoading } =
    useGetRecentBlogsQuery();

  const isLoading =
    blogsLoading || categoriesLoading || featuredLoading || recentLoading;

  if (isLoading) {
    return (
      <section className="containerX my-6 md:my-10 mt-[70px] mb-20">
        <div className="animate-pulse">
          <div className="flex flex-col md:flex-row gap-6 lg:gap-10 xl:gap-20">
            {/* LEFT PORTION */}
            <div className="w-full lg:w-3/5 flex flex-col gap-7 md:gap-10">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="space-y-4">
                  <div className="h-[360px] md:h-[416px] bg-gray-200 rounded"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>

            {/* RIGHT PORTION */}
            <div className="w-full lg:w-2/5 flex flex-col gap-8 md:gap-[52px]">
              <div className="w-full border border-dashed border-neutral-300 p-6 lg:p-10">
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-6"></div>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-4">
                      <div className="h-[77px] w-[112px] bg-gray-200 rounded"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full border border-dashed border-neutral-300 p-6 lg:p-10">
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-6"></div>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-4 bg-gray-200 rounded w-2/3"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const blogs = blogsResponse?.data?.slice(0, 5) || [];
  const categories = categoriesResponse?.data || [];
  const featuredBlogs = featuredBlogsResponse?.data || [];
  const recentBlogs = recentBlogsResponse?.data || [];

  return (
    <section className="containerX my-6 md:my-10 mt-[70px] mb-20 ">
      <div className="flex flex-col md:flex-row gap-6 lg:gap-10 xl:gap-20">
        {/* LEFT PORTION */}
        <div className="w-full lg:w-3/5 flex flex-col gap-7 md:gap-10">
          {blogs.map((item, index) => (
            <BlogCard
              key={index}
              index={index}
              title={item?.title || ""}
              date={item?.publishedAt ? timestampDisplay(item.publishedAt) : ""}
              image={item?.featuredImage || ""}
              link={`/blog/${item?.title || ""}`}
              imageContainerClassName="h-[360px] md:h-[416px] w-full"
            />
          ))}
        </div>

        {/* RIGHT PORTION */}
        <div className="w-full lg:w-2/5 flex flex-col gap-8 md:gap-[52px] relative">
          {/* FEATURED */}
          <div className="w-full border border-dashed border-neutral-300 p-6 lg:p-10 overflow-hidden">
            <p className="title !text-5xl !font-bold !leading-[0.9] text-text-950">
              Featured
            </p>

            <hr className="h-[1px] my-6 border border-dashed border-natural-300" />

            <div className="flex flex-col gap-7 md:gap-10">
              {featuredBlogs.map((item, index) => (
                <BlogCard
                  index={index}
                  key={index}
                  title={item?.title || ""}
                  date={
                    item?.publishedAt ? timestampDisplay(item.publishedAt) : ""
                  }
                  image={item?.featuredImage || ""}
                  link={`/blog/${item?.title || ""}`}
                  imageContainerClassName="!h-[77px] !min-w-[112px] !w-[112px]"
                  className="flex flex-row items-center gap-6"
                  titleClassName="text-sm sm:text-base md:!text-sm lg:text-lg font-bold !leading-[1.4]"
                  contentContainerClassName="!pt-0"
                />
              ))}
            </div>
          </div>

          {/* CATEGORIES */}
          <div className="w-full border border-dashed border-neutral-300 p-6 lg:p-10 sticky top-10">
            <p className="title !text-5xl !font-bold !leading-[0.9] text-text-950">
              Categories
            </p>

            <hr className="h-[1px] my-6 border border-dashed border-natural-300" />

            <div className="flex flex-col">
              {categories.map((item, index) => (
                <p
                  key={index}
                  className="text-sm md:text-lg font-semibold !leading-[1.2] text-black my-6 hover:text-primary-600 transition_common flex flex-row items-center gap-2"
                >
                  <span className="hover:underline">{item?.category}</span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MORE SUGGESTED ARTICLES */}
      <BlogSuggestions data={recentBlogs} />
    </section>
  );
};

export default BlogGalleryClient;
