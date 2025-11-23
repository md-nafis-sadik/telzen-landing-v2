import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  useGetRegionsQuery,
  useGetCountriesQuery,
} from "@/store/modules/destination/destinationApi";
import {
  setDestinationType,
  DestinationType,
} from "@/store/modules/destination/destinationSlice";

export const useDestination = () => {
  const dispatch = useAppDispatch();
  const { activeType } = useAppSelector((state) => state.destination);

  // API queries
  const {
    data: regionsData,
    isLoading: regionsLoading,
    error: regionsError,
  } = useGetRegionsQuery(
    {
      page: 1,
      limit: 8,
    },
    {
      skip: activeType !== "regions",
    }
  );

  const {
    data: countriesData,
    isLoading: countriesLoading,
    error: countriesError,
  } = useGetCountriesQuery(
    {
      page: 1,
      limit: 8,
    },
    {
      skip: activeType !== "countries",
    }
  );

  const handleToggle = (type: DestinationType) => {
    dispatch(setDestinationType(type));
  };

  // Determine what data to show based on active type
  const isLoading =
    activeType === "regions" ? regionsLoading : countriesLoading;
  const currentData =
    activeType === "regions"
      ? regionsData?.data || []
      : countriesData?.data || [];
  const hasError = activeType === "regions" ? regionsError : countriesError;

  return {
    activeType,
    isLoading,
    currentData,
    hasError,
    handleToggle,
  };
};
