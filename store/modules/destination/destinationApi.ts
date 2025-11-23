import { apiSlice } from "../api/apiSlice";

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

export interface Package {
  _id: string;
  name: string;
  validity: string;
  coverage_type: "regional" | "country";
  coverage_region?: string;
  coverage_countries?: string[];
  grand_total_selling_price: number;
  total_data_plan_in_mb: number;
  on_purchase_reward_point?: number;
  currency: string;
  discount?: {
    amount: number;
    is_type_percentage: boolean;
  };
}

export interface PackageParams {
  region_id?: string;
  country_id?: string;
  page?: number;
  limit?: number;
}

export interface SinglePackageParams {
  country_id?: string;
  region_id?: string;
  package_id: string;
}

export interface SinglePackageResponse {
  status_code: number;
  success: boolean;
  message: string;
  meta: null;
  data: Package;
}

export interface Esim {
  _id: string;
  iccid: string;
  msisdn: string;
  qr_code_url: string;
  activation_code: string;
  status: 'active' | 'expired' | 'pending';
  is_set_active: boolean;
  activate_before: number;
  order: string;
  associated_country: {
    _id: string;
    name: string;
  } | null;
  associated_region: {
    _id: string;
    name: string;
  } | null;
  data_package: {
    total_data_plan_in_mb: number;
    validity: {
      amount: number;
      type: string;
    };
    expired_at: number;
  };
  created_at: number;
}

export interface EsimDeleteParams {
  esim_id: string;
}

export interface EsimDeleteResponse {
  status_code: number;
  success: boolean;
  message: string;
  meta: null;
  data: null;
}

// Coupon validation interface
export interface CouponValidationResponse {
  status_code: number;
  success: boolean;
  message: string;
  meta: null;
  data: {
    _id: string;
    code: string;
    type: 'percentage' | 'fixed';
    value: number;
    minimum_order_amount: number;
    maximum_discount_amount?: number;
    is_active: boolean;
    expires_at: number;
  } | null;
}

// Contact support interfaces
export interface ContactSupportData {
  email: string;
  subject: string;
  message: string;
}

export interface ContactSupportResponse {
  status_code: number;
  success: boolean;
  message: string;
  meta: null;
  data: {
    _id: string;
    email: string;
    subject: string;
    message: string;
    created_at: number;
  };
}

export const destinationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRegions: builder.query<ApiResponse<Region>, RegionParams>({
      query: ({ page = 1, limit = 8, search = "" }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });

        if (search.trim()) {
          params.append("search", search.trim());
        }

        return {
          url: `/region?${params.toString()}`,
          baseUrl: "http://46.250.238.64:9000/api/v1/app",
        };
      },
      providesTags: ["Destination"],
    }),

    getCountries: builder.query<ApiResponse<Country>, CountryParams>({
      query: ({ page = 1, limit = 8, search = "" }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });

        if (search.trim()) {
          params.append("search", search.trim());
        }

        return {
          url: `/country?${params.toString()}`,
          baseUrl: "http://46.250.238.64:9000/api/v1/app",
        };
      },
      providesTags: ["Destination"],
    }),

    getPopularCountries: builder.query<
      ApiResponse<Country>,
      PopularCountryParams
    >({
      query: ({ country_code } = {}) => {
        // If country_code is provided, include it in the query
        // If not provided, call the API without country_code parameter
        const baseUrl = "http://46.250.238.64:9000/api/v1/app";
        if (country_code) {
          return {
            url: `/country/popular?country_code=${country_code}`,
            baseUrl,
          };
        } else {
          return {
            url: `/country/popular`,
            baseUrl,
          };
        }
      },
      providesTags: ["Destination"],
    }),

    getPackages: builder.query<ApiResponse<Package>, PackageParams>({
      query: ({ region_id, country_id, page = 1, limit = 10 }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });

        if (region_id) {
          params.append("region_id", region_id);
        }

        if (country_id) {
          params.append("country_id", country_id);
        }

        return {
          url: `/package?${params.toString()}`,
          baseUrl: "http://46.250.238.64:9000/api/v1/app",
        };
      },
      providesTags: ["Package"],
    }),

    getSinglePackage: builder.query<SinglePackageResponse, SinglePackageParams>(
      {
        query: ({ country_id, region_id, package_id }) => {
          const params = new URLSearchParams({
            package_id,
          });

          if (country_id) {
            params.append("country_id", country_id);
          }

          if (region_id) {
            params.append("region_id", region_id);
          }

          return {
            url: `/package/single?${params.toString()}`,
            baseUrl: "http://46.250.238.64:9000/api/v1/app",
          };
        },
        providesTags: ["Package"],
      }
    ),

    getPersonalEsims: builder.query<ApiResponse<Esim>, void>({
      query: () => ({
        url: '/esim/personal',
        baseUrl: 'http://46.250.238.64:9000/api/v1/app'
      }),
      providesTags: ['Esim'],
    }),

    deleteEsim: builder.mutation<EsimDeleteResponse, EsimDeleteParams>({
      query: ({ esim_id }) => ({
        url: `/esim/delete?esim_id=${esim_id}`,
        method: 'DELETE',
        baseUrl: 'http://46.250.238.64:9000/api/v1/app'
      }),
      invalidatesTags: ['Esim'],
    }),

    // Validate coupon
    validateCoupon: builder.query<CouponValidationResponse, string>({
      query: (couponCode) => ({
        url: `/coupon/is-valid?search=${encodeURIComponent(couponCode)}`,
        method: 'GET',
        baseUrl: 'http://46.250.238.64:9000/api/v1/app'
      }),
    }),
    
    // Contact support
    createContactSupport: builder.mutation<ContactSupportResponse, ContactSupportData>({
      query: (data) => ({
        url: '/contact-support/create',
        method: 'POST',
        body: data,
        baseUrl: 'http://46.250.238.64:9000/api/v1/app'
      }),
    }),
  }),
});

export const {
  useGetRegionsQuery,
  useGetCountriesQuery,
  useGetPopularCountriesQuery,
  useGetPackagesQuery,
  useGetSinglePackageQuery,
  useGetPersonalEsimsQuery,
  useDeleteEsimMutation,
  useLazyValidateCouponQuery,
  useCreateContactSupportMutation,
} = destinationApi;
