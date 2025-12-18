import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { destinationApi } from "./destinationApi";
import { Package } from "./destinationApi";

export type DestinationType = "regions" | "countries";

interface DestinationState {
  activeType: DestinationType;
  searchQuery: string;
  homeDestinations: {
    type: DestinationType;
    data: any[];
    loading: boolean;
  };
  destinationPage: {
    type: DestinationType;
    data: any[];
    loading: boolean;
    page: number;
    hasMore: boolean;
    searchQuery: string;
  };
  packageDetails: Package | null;
  grandTotal: number;
  packageLoading: boolean;
  packageError: string | null;
}

const initialState: DestinationState = {
  activeType: "countries",
  searchQuery: "",
  homeDestinations: {
    type: "countries",
    data: [],
    loading: false,
  },
  destinationPage: {
    type: "countries",
    data: [],
    loading: false,
    page: 1,
    hasMore: true,
    searchQuery: "",
  },
  packageDetails: null,
  packageLoading: false,
  packageError: null,
  grandTotal: 0,
};

const destinationSlice = createSlice({
  name: "destination",
  initialState,
  reducers: {
    setDestinationType: (state, action: PayloadAction<DestinationType>) => {
      state.activeType = action.payload;
    },
    
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },

    setHomeDestinations: (
      state,
      action: PayloadAction<{
        type: DestinationType;
        data: any[];
        loading: boolean;
      }>
    ) => {
      state.homeDestinations = action.payload;
    },

    setDestinationPageType: (state, action: PayloadAction<DestinationType>) => {
      state.destinationPage.type = action.payload;
      state.destinationPage.data = [];
      state.destinationPage.page = 1;
      state.destinationPage.hasMore = true;
    },

    setDestinationPageData: (
      state,
      action: PayloadAction<{
        data: any[];
        append?: boolean;
        hasMore: boolean;
      }>
    ) => {
      const { data, append = false, hasMore } = action.payload;

      if (append) {
        state.destinationPage.data = [...state.destinationPage.data, ...data];
      } else {
        state.destinationPage.data = data;
      }

      state.destinationPage.hasMore = hasMore;
    },

    setDestinationPageLoading: (state, action: PayloadAction<boolean>) => {
      state.destinationPage.loading = action.payload;
    },

    incrementDestinationPage: (state) => {
      state.destinationPage.page += 1;
    },

    resetDestinationPage: (state) => {
      state.destinationPage.data = [];
      state.destinationPage.page = 1;
      state.destinationPage.hasMore = true;
    },

    setDestinationPageSearch: (state, action: PayloadAction<string>) => {
      state.destinationPage.searchQuery = action.payload;
    },

    setPackageData: (state, action: PayloadAction<Package>) => {
      state.packageDetails = action.payload;
      state.packageLoading = false;
      state.packageError = null;
    },

    setPackageLoading: (state, action: PayloadAction<boolean>) => {
      state.packageLoading = action.payload;
    },

    setPackageError: (state, action: PayloadAction<string>) => {
      state.packageError = action.payload;
      state.packageLoading = false;
    },

    clearPackageData: (state) => {
      state.packageDetails = null;
      state.packageLoading = false;
      state.packageError = null;
    },
    setGrandTotal: (state, action: PayloadAction<number>) => {
      state.grandTotal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        destinationApi.endpoints.getSinglePackage.matchFulfilled,
        (state, action: PayloadAction<{ data: Package }>) => {
          state.packageLoading = false;
          state.packageError = null;
          state.packageDetails = action.payload.data;
          state.grandTotal = action.payload.data.grand_total_selling_price;
        }
      )
      .addMatcher(
        destinationApi.endpoints.getSinglePackage.matchRejected,
        (state, action: { error: { message?: string } }) => {
          state.packageLoading = false;
          state.packageError =
            action.error?.message || "Failed to fetch package";
        }
      );
  },
});

export const {
  setDestinationType,
  setSearchQuery,
  setHomeDestinations,
  setDestinationPageType,
  setDestinationPageData,
  setDestinationPageLoading,
  incrementDestinationPage,
  resetDestinationPage,
  setDestinationPageSearch,
  setPackageData,
  setPackageLoading,
  setPackageError,
  clearPackageData,
  setGrandTotal,
} = destinationSlice.actions;

export default destinationSlice.reducer;