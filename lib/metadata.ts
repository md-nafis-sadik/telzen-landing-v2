import { envConfig } from "@/service";

export async function getGeneratedMetadata({
  apiUrl = "",
  metaTitle = "",
  path = "",
}) {
  let response: { data?: any } = { data: {} };
  
  try {
    const fetchResponse = await fetch(`${envConfig.blogUrl}${apiUrl}`, {
      next: { revalidate: 300 },
    });
    if (fetchResponse.ok) {
      response = await fetchResponse.json();
    }
  } catch (error) {
    console.error("Error fetching metadata:", error);
  }
  const data = response?.data || {};
  const socialLinks = {
    twitter: "https://twitter.com/netrosystems",
    facebook: "https://www.facebook.com/netrosystems",
    tiktok: "https://www.tiktok.com/@netrosystems",
    linkedin: "https://linkedin.com/company/netrosystems",
    instagram: "https://instagram.com/netrosystems",
    youtube: "https://www.youtube.com/@netrosystems",
  };

  return {
    title: data?.metaTitle
      ? data?.metaTitle
      : data?.title
      ? data?.title
      : metaTitle || "Netrosystems",
    description:
      data?.metaDescription ||
      "Netro is a leading digital agency that empowers businesses with innovative IT solutions, specializing in cloud computing, data analytics, and digital transformation. We partner with brands to enhance their growth through strategies, ensuring efficiency, scalability, and competitive advantage in the digital landscape.",
    keywords: data?.tags?.join(", ") || "Development, Design, SEO, Marketing",
    alternates: {
      canonical: `https://netrosystems.com${path}`,
    },

    openGraph: {
      title: data?.metaTitle,
      description:
        data?.metaDescription ||
        "Netro is a leading digital agency that empowers businesses with innovative IT solutions, specializing in cloud computing, data analytics, and digital transformation. We partner with brands to enhance their growth through strategies, ensuring efficiency, scalability, and competitive advantage in the digital landscape.",
      images: [
        {
          url: data?.image || "/default-image.jpg",
          alt: data?.title || "company Image",
        },
      ],
      url: `https://netrosystems.com/${apiUrl}`,
    },

    twitter: {
      card: "summary_large_image",
      title: data?.metaTitle || "Netrosystems",
      description:
        data?.metaDescription || "Netro is a leading digital agency...",
      image: data?.image || "/default-image.jpg",
    },

    social: {
      twitter: socialLinks.twitter,
      facebook: socialLinks.facebook,
      linkedin: socialLinks.linkedin,
      tiktok: socialLinks.tiktok,
      instagram: socialLinks.instagram,
      youtube: socialLinks.youtube,
    },
  };
}

export const getMetadata = ({
  title = "Netrosystems",
  description = "",
  path = "",
}) => {
  return {
    title: title ? title : "Top Software Development Company | Netro Systems",
    description: description
      ? description
      : "Netro is a leading digital agency that empowers businesses with innovative IT solutions, specializing in cloud computing, data analytics, and digital transformation. We partner with brands to enhance their growth through strategies, ensuring efficiency, scalability, and competitive advantage in the digital landscape.",
    alternates: {
      canonical: `https://netrosystems.com${path}`,
    },

    icons: {
      icon: "/favicon.ico",
    },
  };
};
