import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UiState {
  authModal: {
    isOpen: boolean;
    step: "login" | "register" | "otp" | "success";
    email: string;
    otpType: "signin" | "signup";
  };
  businessAuthModal: {
    isOpen: boolean;
    step: "login" | "register" | "otp";
    email: string;
    otpType: "login" | "register";
  };
  profileModal: {
    isOpen: boolean;
  };
  logoutModal: {
    isOpen: boolean;
  };
  removeEsimModal: {
    isOpen: boolean;
    selectedEsimId: string | null;
  };
  esimSuccessModal: {
    isOpen: boolean;
  };
  loading: {
    global: boolean;
  };
}

const initialState: UiState = {
  authModal: {
    isOpen: false,
    step: "login",
    email: "soumikdev03@gmail.com",
    otpType: "signin",
  },
  businessAuthModal: {
    isOpen: false,
    step: "login",
    email: "",
    otpType: "login",
  },
  profileModal: {
    isOpen: false,
  },
  logoutModal: {
    isOpen: false,
  },
  removeEsimModal: {
    isOpen: false,
    selectedEsimId: null,
  },
  esimSuccessModal: {
    isOpen: false,
  },
  loading: {
    global: false,
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openAuthModal: (
      state,
      action: PayloadAction<{ step?: "login" | "register" | "otp" | "success"; email?: string }>
    ) => {
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
      state.authModal.otpType = "signin";
    },
    setAuthModalStep: (
      state,
      action: PayloadAction<"login" | "register" | "otp" | "success">
    ) => {
      state.authModal.step = action.payload;
    },
    openBusinessAuthModal: (
      state,
      action: PayloadAction<{ step?: "login" | "register" | "otp"; email?: string }>
    ) => {
      state.businessAuthModal.isOpen = true;
      state.businessAuthModal.step = action.payload?.step || "login";
      if (action.payload?.email) {
        state.businessAuthModal.email = action.payload.email;
      }
    },
    closeBusinessAuthModal: (state) => {
      state.businessAuthModal.isOpen = false;
      state.businessAuthModal.step = "login";
      state.businessAuthModal.email = "";
      state.businessAuthModal.otpType = "login";
    },
    setBusinessAuthModalStep: (
      state,
      action: PayloadAction<"login" | "register" | "otp">
    ) => {
      state.businessAuthModal.step = action.payload;
    },
    setBusinessAuthModalEmail: (state, action: PayloadAction<string>) => {
      state.businessAuthModal.email = action.payload;
    },
    setBusinessAuthModalOtpType: (state, action: PayloadAction<"login" | "register">) => {
      state.businessAuthModal.otpType = action.payload;
    },
    setAuthModalEmail: (state, action: PayloadAction<string>) => {
      state.authModal.email = action.payload;
    },
    setAuthModalOtpType: (state, action: PayloadAction<"signin" | "signup">) => {
      state.authModal.otpType = action.payload;
    },
    setGlobalLoading: (state, action: PayloadAction<boolean>) => {
      state.loading.global = action.payload;
    },
    openProfileModal: (state) => {
      state.profileModal.isOpen = true;
    },
    closeProfileModal: (state) => {
      state.profileModal.isOpen = false;
    },
    openLogoutModal: (state) => {
      state.logoutModal.isOpen = true;
    },
    closeLogoutModal: (state) => {
      state.logoutModal.isOpen = false;
    },
    openRemoveEsimModal: (state, action: PayloadAction<string>) => {
      state.removeEsimModal.isOpen = true;
      state.removeEsimModal.selectedEsimId = action.payload;
    },
    closeRemoveEsimModal: (state) => {
      state.removeEsimModal.isOpen = false;
      state.removeEsimModal.selectedEsimId = null;
    },
    openEsimSuccessModal: (state) => {
      state.esimSuccessModal.isOpen = true;
    },
    closeEsimSuccessModal: (state) => {
      state.esimSuccessModal.isOpen = false;
    },
  },
});

export const {
  openAuthModal,
  closeAuthModal,
  setAuthModalStep,
  setAuthModalEmail,
  setAuthModalOtpType,
  openBusinessAuthModal,
  closeBusinessAuthModal,
  setBusinessAuthModalStep,
  setBusinessAuthModalEmail,
  setBusinessAuthModalOtpType,
  setGlobalLoading,
  openProfileModal,
  closeProfileModal,
  openLogoutModal,
  closeLogoutModal,
  openRemoveEsimModal,
  closeRemoveEsimModal,
  openEsimSuccessModal,
  closeEsimSuccessModal,
} = uiSlice.actions;

export default uiSlice.reducer;
