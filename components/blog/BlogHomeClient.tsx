"use client";

import React from "react";
import OurBlog from "./BlogHome";
import { useGetAllBlogsQuery } from "@/store/modules/blog/blogApi";

const BlogHomeClient = () => {
  const { data: blogsResponse, isLoading, error } = useGetAllBlogsQuery();

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="containerX py-12">
          <div className="text-center mb-8">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-4">
                <div className="h-48 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return null; // Silently fail for home page
  }

  const limitedBlogs = blogsResponse?.data?.slice(0, 3) || [];

  return <OurBlog data={limitedBlogs} />;
};

export default BlogHomeClient;
