import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type DestinationType = 'regions' | 'countries';

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
}

const initialState: DestinationState = {
  activeType: 'countries',
  searchQuery: '',
  homeDestinations: {
    type: 'countries',
    data: [],
    loading: false,
  },
  destinationPage: {
    type: 'countries',
    data: [],
    loading: false,
    page: 1,
    hasMore: true,
    searchQuery: '',
  },
};

const destinationSlice = createSlice({
  name: 'destination',
  initialState,
  reducers: {
    setDestinationType: (state, action: PayloadAction<DestinationType>) => {
      state.activeType = action.payload;
    },
    
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },

    setHomeDestinations: (state, action: PayloadAction<{
      type: DestinationType;
      data: any[];
      loading: boolean;
    }>) => {
      state.homeDestinations = action.payload;
    },

    setDestinationPageType: (state, action: PayloadAction<DestinationType>) => {
      state.destinationPage.type = action.payload;
      state.destinationPage.data = [];
      state.destinationPage.page = 1;
      state.destinationPage.hasMore = true;
    },

    setDestinationPageData: (state, action: PayloadAction<{
      data: any[];
      append?: boolean;
      hasMore: boolean;
    }>) => {
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
} = destinationSlice.actions;

export default destinationSlice.reducer;