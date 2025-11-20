import { fetchWithDelay } from "@/lib/apiHandler";
import BlogSuggestions from "../shared/BlogSuggestions";

type BlogsResponse = {
  data?: any[];
  [key: string]: any;
};
const BlogSuggestionWrapper = async () => {
  // ALL BLOGS
  const blogsResponse: any = await fetchWithDelay(`/blogs/all`);
  let blogs: BlogsResponse;
  if (Array.isArray(blogsResponse)) {
    blogs = { data: blogsResponse.slice(0, 5) };
  } else if (blogsResponse && typeof blogsResponse === "object") {
    blogs = { ...blogsResponse, data: blogsResponse?.data?.slice(0, 5) };
  } else {
    blogs = { data: [] };
  }

  return <BlogSuggestions data={blogs?.data} className="!mt-5 md:!mt-10" />;
};

export default BlogSuggestionWrapper;
