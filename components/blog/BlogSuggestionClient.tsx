"use client";

import React from "react";
import BlogSuggestions from "../shared/BlogSuggestions";
import { useGetAllBlogsQuery } from "@/store/modules/blog/blogApi";

const BlogSuggestionClient = () => {
  const { data: blogsResponse, isLoading, error } = useGetAllBlogsQuery();

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="space-y-4">
              <div className="h-48 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Failed to load suggestions</div>;
  }

  const limitedBlogs = blogsResponse?.data?.slice(0, 5) || [];

  return <BlogSuggestions data={limitedBlogs} className="!mt-5 md:!mt-10" />;
};

export default BlogSuggestionClient;
