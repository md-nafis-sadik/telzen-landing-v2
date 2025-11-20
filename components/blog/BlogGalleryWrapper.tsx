import BlogSuggestions from "@/components/shared/BlogSuggestions";
import { fetchWithDelay, timestampDisplay } from "@/lib/apiHandler";
import BlogCard from "./BlogCard";

type BlogsResponse = {
  data?: any[];
  [key: string]: any;
};

const BlogGalleryWrapper = async () => {
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

  // BLOG CATEGORIES
  const categoriesResponse = await fetchWithDelay(`/blogs/landing`);
  const categories: { data: any[] } =
    categoriesResponse &&
    typeof categoriesResponse === "object" &&
    "data" in categoriesResponse &&
    Array.isArray((categoriesResponse as { data?: any }).data)
      ? { data: (categoriesResponse as { data: any[] }).data }
      : { data: [] };

  // FEATURED BLOGS
  const featuredBlogsResponse: any = await fetchWithDelay(`/blogs/featured`);
  let featuredBlogs: BlogsResponse;
  if (Array.isArray(featuredBlogsResponse)) {
    featuredBlogs = { data: featuredBlogsResponse };
  } else if (
    featuredBlogsResponse &&
    typeof featuredBlogsResponse === "object"
  ) {
    featuredBlogs = {
      ...featuredBlogsResponse,
      data: featuredBlogsResponse?.data ?? [],
    };
  } else {
    featuredBlogs = { data: [] };
  }

  // RECENT BLOGS
  const recentBlogsResponse = await fetchWithDelay(`/blogs/recent`);
  let recentBlogs: BlogsResponse;
  if (Array.isArray(recentBlogsResponse)) {
    recentBlogs = { data: recentBlogsResponse };
  } else if (recentBlogsResponse && typeof recentBlogsResponse === "object") {
    recentBlogs = {
      ...recentBlogsResponse,
      data: (recentBlogsResponse as { data?: any[] })?.data ?? [],
    };
  } else {
    recentBlogs = { data: [] };
  }

  return (
    <section className="containerX my-6 md:my-10 mt-[70px] mb-20 ">
      <div className="flex flex-col md:flex-row gap-6 lg:gap-10 xl:gap-20">
        {/* LEFT PORTION */}
        <div className="w-full lg:w-3/5 flex flex-col gap-7 md:gap-10">
          {blogs?.data?.map((item, index) => (
            <BlogCard
              key={index}
              index={index}
              title={item?.title}
              date={timestampDisplay(item?.publishedAt)}
              image={item?.featuredImage}
              link={`/blog/${item?.title}`}
              imageContainerClassName="h-[360px] md:h-[416px] w-full"
            />
          ))}
        </div>

        {/* RIGHT PORTION */}
        <div className="w-full lg:w-2/5 flex flex-col gap-8 md:gap-[52px] relative">
          {/* FEATURED */}
          <div className="w-full border border-dashed border-neutral-300 p-6 lg:p-10 overflow-hidden">
            <p className="title text-5xl font-bold !leading-[0.9] text-black">
              Featured
            </p>

            <hr className="h-[1px] my-6 border border-dashed border-natural-300" />

            <div className="flex flex-col gap-7 md:gap-10">
              {featuredBlogs?.data?.map((item, index) => (
                <BlogCard
                  index={index}
                  key={index}
                  title={item?.title}
                  date={timestampDisplay(item?.publishedAt)}
                  image={item?.featuredImage}
                  link={`/blog/${item?.title}`}
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
            <p className="title text-5xl font-bold !leading-[0.9] text-black">
              Categories
            </p>

            <hr className="h-[1px] my-6 border border-dashed border-natural-300" />

            <div className="flex flex-col">
              {categories?.data?.map((item, index) => (
                <p
                  key={index}
                  //   href={`/blog/${slug}`}
                  className="text-sm md:text-lg font-semibold !leading-[1.2] text-black my-6 hover:text-primary-600 transition_common"
                >
                  <span className="hover:underline">{item?.category}</span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MORE SUGGESTED ARTICLES */}
      <BlogSuggestions data={recentBlogs?.data} />
    </section>
  );
};

export default BlogGalleryWrapper;
