import { apiSlice } from "../api/apiSlice";
import { envConfig } from "@/service";

export interface BlogPost {
  id?: string;
  title?: string;
  content?: string;
  featuredImage?: string;
  publishedAt?: number;
  category?: string;
  featured?: boolean;
}

export interface BlogsResponse {
  data: BlogPost[];
  total?: number;
  page?: number;
  limit?: number;
}

export const blogApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all blogs
    getAllBlogs: builder.query<BlogsResponse, void>({
      query: () => ({
        url: "/blogs/all",
        baseUrl: envConfig.blogUrl,
      }),
      transformResponse: (response: any): BlogsResponse => {
        if (Array.isArray(response)) {
          return { data: response };
        } else if (response && typeof response === "object" && response.data) {
          return response;
        }
        return { data: [] };
      },
    }),

    // Get blog by title
    getBlogByTitle: builder.query<{ data: BlogPost }, string>({
      query: (title) => ({
        url: `/blogs/find-by-title/${title}`,
        baseUrl: envConfig.blogUrl,
      }),
      transformResponse: (response: any) => {
        if (response && typeof response === "object") {
          return response;
        }
        return { data: {} as BlogPost };
      },
    }),

    // Get featured blogs
    getFeaturedBlogs: builder.query<BlogsResponse, void>({
      query: () => ({
        url: "/blogs/featured",
        baseUrl: envConfig.blogUrl,
      }),
      transformResponse: (response: any): BlogsResponse => {
        if (Array.isArray(response)) {
          return { data: response };
        } else if (response && typeof response === "object" && response.data) {
          return response;
        }
        return { data: [] };
      },
    }),

    // Get recent blogs
    getRecentBlogs: builder.query<BlogsResponse, void>({
      query: () => ({
        url: "/blogs/recent",
        baseUrl: envConfig.blogUrl,
      }),
      transformResponse: (response: any): BlogsResponse => {
        if (Array.isArray(response)) {
          return { data: response };
        } else if (response && typeof response === "object" && response.data) {
          return response;
        }
        return { data: [] };
      },
    }),

    // Get blog categories for landing
    getBlogCategories: builder.query<
      { data: Array<{ category: string }> },
      void
    >({
      query: () => ({
        url: "/blogs/landing",
        baseUrl: envConfig.blogUrl,
      }),
      transformResponse: (response: any) => {
        if (
          response &&
          typeof response === "object" &&
          Array.isArray(response.data)
        ) {
          return response;
        }
        return { data: [] };
      },
    }),
  }),
});

export const {
  useGetAllBlogsQuery,
  useGetBlogByTitleQuery,
  useGetFeaturedBlogsQuery,
  useGetRecentBlogsQuery,
  useGetBlogCategoriesQuery,
} = blogApi;
