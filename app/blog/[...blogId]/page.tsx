import BlogDetailsSkeleton from "@/components/blog/BlogDetailsSkeleton";
import BlogDetailsClient from "@/components/blog/BlogDetailsClient";
import BlogSuggestionClient from "@/components/blog/BlogSuggestionClient";
import { getGeneratedMetadata } from "@/lib/metadata";
import { Suspense } from "react";

// Generate static params for static export
export function generateStaticParams() {
  // Define some common blog slugs for static generation
  const commonBlogs = [
    "5g-coverage-worldwide",
    "best-esim-providers-2024",
    "travel-connectivity-guide",
    "esim-vs-physical-sim",
    "international-roaming-costs",
    "mobile-data-security-tips",
    "digital-nomad-connectivity",
    "business-travel-solutions",
    "vacation-internet-plans",
    "global-network-coverage",
  ];

  return commonBlogs.map((blogId) => ({
    blogId: [blogId],
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ blogId: string | string[] }>;
}) {
  const { blogId } = await params;
  const blogIdStr = Array.isArray(blogId) ? blogId.join("/") : blogId;
  const id = purifyUrl({ urlString: blogIdStr });
  const url = `/blogs/find-by-title/${id}`;
  return await getGeneratedMetadata({
    apiUrl: url,
    metaTitle: id,
    path: `/blogs/${blogIdStr}`,
  });
}
export function purifyUrl({ urlString }: { urlString: string }) {
  return urlString?.replace(/%20/g, " ");
}

const BlogDetailsPage = async ({
  params,
}: {
  params: Promise<{ blogId: string | string[] }>;
}) => {
  const { blogId } = await params;
  const blogIdString = Array.isArray(blogId) ? blogId.join("/") : blogId;
  const purifiedId = purifyUrl({ urlString: blogIdString });

  return (
    <main className="relative mt-[60px]">
      <BlogDetailsClient id={purifiedId as string} />

      <section className="containerX pt-10 md:pt-20 pb-5 md:pb-10">
        {/* MORE SUGGESTED ARTICLES */}
        <BlogSuggestionClient />
      </section>
    </main>
  );
};

export default BlogDetailsPage;
