"use client";

import Image from "next/image";
import React from "react";
import type { StaticImport } from "next/dist/shared/lib/get-img-props";
import PageThumbnail from "../shared/PageThumbnail";
import { timestampDisplay } from "@/lib/apiHandler";
import { images } from "@/service";
import BlogDetailsShareSocials from "./BlogDetailsShareSocials";
import { useGetBlogByTitleQuery } from "@/store/modules/blog/blogApi";

type Data = {
  featuredImage: string | StaticImport;
  content: any;
  title: string;
  publishedAt: number;
};

const BlogDetailsClient = ({ id }: { id: string }) => {
  const { data: blog, isLoading, error } = useGetBlogByTitleQuery(id);
  const blogData = blog?.data;

  if (isLoading) {
    return (
      <section className="">
        <div className="animate-pulse">
          <PageThumbnail
            title="Loading..."
            description="Loading..."
            titleClassName="text-[#1D1D1D] text-[48px] md:text-[64px] lg:text-[96px]"
          />
          <div className="containerX relative overflow-hidden w-full">
            <div className="h-[420px] lg:h-[550px] bg-gray-200 rounded"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="">
        <PageThumbnail
          title="Error"
          description="Failed to load blog"
          titleClassName="text-[#1D1D1D] text-[48px] md:text-[64px] lg:text-[96px]"
        />
      </section>
    );
  }

  return (
    <section className="">
      <PageThumbnail
        title={blogData?.title}
        description={
          blogData?.publishedAt ? timestampDisplay(blogData.publishedAt) : ""
        }
        titleClassName="text-[#1D1D1D] text-[48px] md:text-[64px] lg:text-[96px]"
      />

      <div className="containerX relative overflow-hidden w-full">
        <Image
          src={blogData?.featuredImage || images.blog1}
          alt={blogData?.title || "Blog image 1"}
          className="h-auto md:h-[420px] lg:h-[550px] min-w-full object-cover"
          loading="lazy"
          height={1280}
          width={1920}
        />
      </div>

      <div className="containerX max-w-[952px] px-4 sm:px-8 lg:px-0">
        <div
          className="content font-inter"
          dangerouslySetInnerHTML={{ __html: blogData?.content || "" }}
        />

        <BlogDetailsShareSocials blog={blogData} />
      </div>
    </section>
  );
};

export default BlogDetailsClient;
