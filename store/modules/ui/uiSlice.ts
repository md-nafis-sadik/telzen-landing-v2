import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UiState {
  authModal: {
    isOpen: boolean;
    step: "login" | "register" | "otp" | "success";
    email: string;
  };
  loading: {
    global: boolean;
  };
}

const initialState: UiState = {
  authModal: {
    isOpen: false,
    step: "login",
    email: "",
  },
  loading: {
    global: false,
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openAuthModal: (state, action: PayloadAction<{ step?: "login" | "register"; email?: string }>) => {
      state.authModal.isOpen = true;
      state.authModal.step = action.payload?.step || "login";
      if (action.payload?.email) {
        state.authModal.email = action.payload.email;
      }
    },
    closeAuthModal: (state) => {
      state.authModal.isOpen = false;
      state.authModal.step = "login";
      state.authModal.email = "";
    },
    setAuthModalStep: (state, action: PayloadAction<"login" | "register" | "otp" | "success">) => {
      state.authModal.step = action.payload;
    },
    setAuthModalEmail: (state, action: PayloadAction<string>) => {
      state.authModal.email = action.payload;
    },
    setGlobalLoading: (state, action: PayloadAction<boolean>) => {
      state.loading.global = action.payload;
    },
  },
});

export const {
  openAuthModal,
  closeAuthModal,
  setAuthModalStep,
  setAuthModalEmail,
  setGlobalLoading,
} = uiSlice.actions;

export default uiSlice.reducer;