import { useAppSelector } from "@/store/hooks";
import { useGetPopularCountriesQuery } from "@/store/modules/destination/destinationApi";
import { getCountryCode as getStoredCountryCode } from "./useLocation";
import { useCurrency } from "./useCurrency";

export const useRecommendedDestinations = () => {
  const { isAuthenticated, auth } = useAppSelector((state) => state.auth);
  const { currencyCode } = useCurrency();

  const getApiCountryCode = (): string | undefined => {
    if (isAuthenticated && auth.country?.code) {
      return auth.country.code;
    }

    const storedCode = getStoredCountryCode();
    if (
      storedCode !== "BD" ||
      (typeof window !== "undefined" &&
        localStorage.getItem("telzen_country_code"))
    ) {
      return storedCode;
    }

    return undefined;
  };

  const countryCode = getApiCountryCode();

  const {
    data: popularCountriesData,
    isLoading,
    error,
  } = useGetPopularCountriesQuery(
    countryCode 
      ? { country_code: countryCode, currency_code: currencyCode } 
      : { currency_code: currencyCode },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const popularCountries = popularCountriesData?.data?.slice(0, 4) || [];

  return {
    popularCountries,
    isLoading,
    error,
  };
};
