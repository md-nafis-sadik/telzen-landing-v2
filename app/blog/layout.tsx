import { getMetadata } from "@/lib/metadata";

export const metadata = getMetadata({
  title: "Blog - Netrosystems",
  path: "/blog",
});

const BlogLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className="h-full w-full">{children}</div>;
};

export default BlogLayout;
