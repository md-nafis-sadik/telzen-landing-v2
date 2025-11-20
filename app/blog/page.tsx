import BlurText from "@/components/animation/BlurText";
import BlogGalleryClient from "@/components/blog/BlogGalleryClient";
import PageThumbnail from "@/components/shared/PageThumbnail";
import { appStrings } from "@/service";

const BlogPage = () => {
  return (
    <main className="relative mt-[60px]">
      <h2 className="title text-text-950 mb-6 md:mb-10 lg:mb-20 overflow-hidden text-center">
        <BlurText
          text={appStrings.blogs}
          translateY={[50, 0]}
          className="md:tracking-[-2px]"
        />
      </h2>

      <BlogGalleryClient />
    </main>
  );
};

export default BlogPage;
