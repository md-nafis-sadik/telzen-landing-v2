import { fetchWithDelay } from "@/lib/apiHandler";
import OurBlog from "./BlogHome";

type BlogsResponse = {
  data?: any[];
  [key: string]: any;
};

const BlogHomeWrapper = async () => {
  const blogsResponse: any = await fetchWithDelay(`/blogs/all`);
  let blogs: BlogsResponse;

  if (Array.isArray(blogsResponse)) {
    blogs = { data: blogsResponse.slice(0, 5) };
  } else if (blogsResponse && typeof blogsResponse === "object") {
    blogs = { ...blogsResponse, data: blogsResponse?.data?.slice(0, 5) };
  } else {
    blogs = { data: [] };
  }

  return <OurBlog data={blogs?.data?.slice(0, 3)} />;
};

export default BlogHomeWrapper;
