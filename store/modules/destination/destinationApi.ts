import { apiSlice } from '../api/apiSlice';

export interface Region {
  _id: string;
  name: string;
  image: string;
  cover_image: string;
  region_id: string;
  status: string;
  created_at: number;
  start_from: number;
  is_free_package_available: boolean;
  highest_discount: {
    amount: number;
    is_type_percentage: boolean;
  };
}

export interface Country {
  _id: string;
  name: string;
  code: string;
  flag: string;
  country_id: string;
  image: string;
  cover_image: string;
  status: string;
  region: {
    _id: string;
    name: string;
    status: string;
  };
  is_popular: boolean;
  created_at: number;
  start_from: number;
  total_packages: number;
  is_free_package_available: boolean;
  highest_discount: {
    amount: number;
    is_type_percentage: boolean;
  };
}

export interface ApiResponse<T> {
  status_code: number;
  success: boolean;
  message: string;
  meta: {
    total_items: number;
    total_pages: number;
    current_page: number;
    page_size: number;
    has_next_page: boolean;
    has_previous_page: boolean;
  };
  data: T[];
}

export interface RegionParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface CountryParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface PopularCountryParams {
  country_code?: string;
}

export const destinationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRegions: builder.query<ApiResponse<Region>, RegionParams>({
      query: ({ page = 1, limit = 8, search = '' }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });
        
        if (search.trim()) {
          params.append('search', search.trim());
        }
        
        return {
          url: `/region?${params.toString()}`,
          baseUrl: 'http://46.250.238.64:9000/api/v1/app'
        };
      },
      providesTags: ['Destination'],
    }),

    getCountries: builder.query<ApiResponse<Country>, CountryParams>({
      query: ({ page = 1, limit = 8, search = '' }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });
        
        if (search.trim()) {
          params.append('search', search.trim());
        }
        
        return {
          url: `/country?${params.toString()}`,
          baseUrl: 'http://46.250.238.64:9000/api/v1/app'
        };
      },
      providesTags: ['Destination'],
    }),

    getPopularCountries: builder.query<ApiResponse<Country>, PopularCountryParams>({
      query: ({ country_code = 'BD' } = {}) => ({
        url: `/country/popular?country_code=${country_code}`,
        baseUrl: 'http://46.250.238.64:9000/api/v1/app'
      }),
      providesTags: ['Destination'],
    }),
  }),
});

export const {
  useGetRegionsQuery,
  useGetCountriesQuery,
  useGetPopularCountriesQuery,
} = destinationApi;