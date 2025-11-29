# API Configuration Guide

## Environment Variables

All API endpoints are now centralized in `.env.local`:

```env
# API Configuration
NEXT_PUBLIC_WEB_API_URL=http://46.250.238.64:9000/api/v1/web
NEXT_PUBLIC_APP_API_URL=http://46.250.238.64:9000/api/v1/app
NEXT_PUBLIC_BASE_URL=http://46.250.238.64:9000/api/v1/web
NEXT_PUBLIC_BLOG_URL=https://server.netrosystems.com

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

## Configuration Usage

### 1. Environment Config (`service/config/env.ts`)

```typescript
const envConfig = {
  webApiUrl: process.env.NEXT_PUBLIC_WEB_API_URL || "http://46.250.238.64:9000/api/v1/web",
  appApiUrl: process.env.NEXT_PUBLIC_APP_API_URL || "http://46.250.238.64:9000/api/v1/app",
  blogUrl: process.env.NEXT_PUBLIC_BLOG_URL || "https://server.netrosystems.com",
  stripePublishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
};
```

### 2. API Slice Configuration (`store/modules/api/apiSlice.ts`)

The base API slice uses `envConfig.webApiUrl` as the default baseUrl for all endpoints:

```typescript
import { envConfig } from "@/service/config/env";

// Default to webApiUrl
url = `${envConfig.webApiUrl}${args.url}`;
```

### 3. API Endpoints by Module

#### Auth API (`store/modules/auth/authApi.ts`)
- **Base URL**: `envConfig.webApiUrl` (default from apiSlice)
- **Format**: RTK Query mutations/queries
- **Endpoints**:
  - `/auth/signup` (POST)
  - `/auth/signin` (POST)
  - `/auth/otp-verify` (POST)
  - `/auth/resend-otp` (POST)
  - `/auth/profile` (GET)
- **Hooks**: `useSignupMutation`, `useSigninMutation`, `useOtpVerifyMutation`, `useResendOtpMutation`, `useGetProfileQuery`, `useUpdateProfileMutation`

#### Checkout API (`store/modules/checkout/checkoutApi.ts`)
- **Base URL**: `envConfig.webApiUrl` (default from apiSlice)
- **Format**: RTK Query mutations
- **Endpoints**:
  - `/checkout/create-payment?order_type={orderType}` (POST)
  - `/checkout/verify-payment?order_id={orderId}` (POST)
  - `/checkout/cancel-payment?order_id={orderId}` (POST)
- **Hooks**: `useCreatePaymentMutation`, `useVerifyPaymentMutation`, `useCancelPaymentMutation`

#### Blog API (`store/modules/blog/blogApi.ts`)
- **Base URL**: `envConfig.blogUrl` (explicitly set per endpoint)
- **Format**: RTK Query queries
- **Endpoints**:
  - `/blogs/all` (GET)
  - `/blogs/find-by-title/{title}` (GET)
  - `/blogs/featured` (GET)
  - `/blogs/recent` (GET)
  - `/blogs/landing` (GET)
- **Hooks**: `useGetAllBlogsQuery`, `useGetBlogByTitleQuery`, `useGetFeaturedBlogsQuery`, `useGetRecentBlogsQuery`, `useGetBlogCategoriesQuery`

#### Destination API (`store/modules/destination/destinationApi.ts`)
- **Base URL**: `envConfig.appApiUrl` (explicitly set per endpoint)
- **Format**: RTK Query queries/mutations
- **Endpoints**:
  - `/region` (GET)
  - `/country` (GET)
  - `/country/popular` (GET)
  - `/package` (GET)
  - `/package/single` (GET)
  - `/esim/personal` (GET)
  - `/esim/delete?esim_id={esimId}` (DELETE)
  - `/coupon/is-valid?search={couponCode}` (GET)
  - `/contact-support/create` (POST)
- **Hooks**: `useGetRegionsQuery`, `useGetCountriesQuery`, `useGetPopularCountriesQuery`, `useGetPackagesQuery`, `useGetSinglePackageQuery`, `useGetPersonalEsimsQuery`, `useDeleteEsimMutation`, `useLazyValidateCouponQuery`, `useCreateContactSupportMutation`

## API URL Structure

### Web API (Authentication & Checkout)
- **URL**: `http://46.250.238.64:9000/api/v1/web`
- **Used by**: authApi, checkoutApi
- **Purpose**: User authentication, payment processing

### App API (Destinations & Packages)
- **URL**: `http://46.250.238.64:9000/api/v1/app`
- **Used by**: destinationApi
- **Purpose**: eSIM packages, regions, countries, esim management

### Blog API
- **URL**: `https://server.netrosystems.com`
- **Used by**: blogApi
- **Purpose**: Blog content management

## Benefits of Centralization

✅ **Single Source of Truth**: All API URLs defined in `.env.local`
✅ **Consistent Format**: All APIs use RTK Query (queries/mutations)
✅ **Easy Environment Switching**: Change URLs for dev/staging/production
✅ **No Hardcoded URLs**: All endpoints use `envConfig`
✅ **Type Safety**: Full TypeScript typing across all endpoints
✅ **Automatic Caching**: RTK Query handles caching automatically
✅ **Loading States**: Built-in loading/error states via hooks
✅ **Maintainability**: Update once, applies everywhere

## Changing API URLs

To change API endpoints for different environments:

1. Update `.env.local` (or create `.env.production`, `.env.staging`)
2. No code changes required
3. Restart development server

Example for production:
```env
NEXT_PUBLIC_WEB_API_URL=https://api.telzen.com/api/v1/web
NEXT_PUBLIC_APP_API_URL=https://api.telzen.com/api/v1/app
```

## Verification

Run this command to verify no hardcoded URLs exist:
```bash
grep -r "http://46.250.238.64:9000" --exclude-dir=node_modules --exclude="*.md"
```

Should only show matches in:
- `.env.local` (✅ Correct)
- `service/config/env.ts` (✅ Correct - fallback values)

## API Call Pattern (Unified Across All Modules)

All API calls now follow the same RTK Query pattern:

### 1. Define in API Slice
```typescript
export const moduleApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    endpointName: builder.mutation<ResponseType, ParamsType>({
      query: (params) => ({
        url: `/endpoint-path`,
        method: "POST",
        body: params,
        // baseUrl: envConfig.appApiUrl, // Only if different from default
      }),
    }),
  }),
});
```

### 2. Use Generated Hooks
```typescript
const [mutationName, { isLoading, error }] = useMutationNameMutation();
const { data, isLoading, error } = useQueryNameQuery(params);
```

### 3. No Direct fetch() Calls
❌ **Before (Inconsistent)**:
```typescript
// Old checkout pattern - direct fetch calls
const response = await fetch(`${envConfig.baseUrl}checkout/create-payment`, {
  method: "POST",
  headers: { "Authorization": `Bearer ${token}` },
  body: JSON.stringify(data)
});
```

✅ **Now (Consistent)**:
```typescript
// New unified pattern - RTK Query
const [createPayment] = useCreatePaymentMutation();
const result = await createPayment({ params }).unwrap();
```

## Migration Summary

### Checkout API Migration
- ❌ **Before**: Custom hook with fetch() calls in `useCheckout.ts`
- ✅ **After**: RTK Query mutations in `checkoutApi.ts`
- **Impact**: Same API, same functionality, better state management
- **Breaking Changes**: None - wrapper hook maintains same interface

### Benefits of RTK Query Pattern
1. **Automatic Authentication**: Token added via `prepareHeaders` in `apiSlice`
2. **Centralized Error Handling**: Toast notifications in `onQueryStarted`
3. **Cache Management**: Automatic invalidation with `invalidatesTags`
4. **Loading States**: Built-in `isLoading`, `error`, `data` states
5. **Type Safety**: Full TypeScript support with generics
