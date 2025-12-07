import BlurText from "@/components/animation/BlurText";
import BlogGalleryClient from "@/components/blog/BlogGalleryClient";
import PageThumbnail from "@/components/shared/PageThumbnail";
import { appStrings } from "@/service";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Travel Tips & eSIM Guides | Telzen",
  description: "Discover travel tips, destination guides, and eSIM tutorials on the Telzen blog. Stay informed about global connectivity and travel technology trends.",
  keywords: "travel blog, eSIM guides, destination tips, travel technology, connectivity guides, digital nomad tips, international travel",
  openGraph: {
    title: "Blog - Travel Tips & eSIM Guides | Telzen",
    description: "Discover travel tips, destination guides, and eSIM tutorials on the Telzen blog. Stay informed about global connectivity and travel technology trends.",
    url: "/blog",
  },
};

const BlogPage = () => {
  return (
    <main className="relative mt-[60px]">
      <h2 className="title text-text-950 mb-6 md:mb-10 lg:mb-20 text-center">
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
