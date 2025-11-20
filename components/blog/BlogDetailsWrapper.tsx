import Image from "next/image";
import React from "react";
import type { StaticImport } from "next/dist/shared/lib/get-img-props";
import PageThumbnail from "../shared/PageThumbnail";
import { fetchWithDelay, timestampDisplay } from "@/lib/apiHandler";
import { images } from "@/service";
import BlogDetailsShareSocials from "./BlogDetailsShareSocials";

type Data = {
  featuredImage: string | StaticImport;
  content: any;
  title: string;
  publishedAt: number;
};

type Blog = {
  data: Data;
};

const BlogDetailsWrapper = async ({ id }: { id: string }) => {
  const blog = (await fetchWithDelay(`/blogs/find-by-title/${id}`)) as Blog;
  const blogData = blog?.data;

  return (
    <section className="">
      <PageThumbnail
        title={blogData?.title}
        description={timestampDisplay(blogData?.publishedAt)}
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

export default BlogDetailsWrapper;
