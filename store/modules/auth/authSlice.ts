import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Country {
  code: string;
  name: string;
}

export interface User {
  id?: string;
  name?: string;
  email?: string;
  country?: Country;
  token?: string;
  expireAt?: number;
}

interface AuthState {
  auth: User;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  auth: {},
  isAuthenticated: false,
  loading: false,
  error: null,
};

const encryptValue = (value: string) => {
  return { data: btoa(value) };
};

const decryptValue = (data: string) => {
  try {
    return atob(data);
  } catch {
    return null;
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    saveAuthData: (state, action: PayloadAction<User>) => {
      state.auth = { ...state.auth, ...action.payload };
      state.isAuthenticated = !!action.payload.token;
      state.loading = false;
      state.error = null;
      
      // Save to localStorage
      const { data } = encryptValue(JSON.stringify(state.auth));
      localStorage.setItem("telzen_auth", data);
    },
    initiateAuthData: (state, action: PayloadAction<User>) => {
      state.auth = { ...action.payload };
      state.isAuthenticated = !!action.payload.token;
      
      // Save to localStorage
      const { data } = encryptValue(JSON.stringify(state.auth));
      localStorage.setItem("telzen_auth", data);
    },
    updateAuth: (state, action: PayloadAction<Partial<User>>) => {
      state.auth = { ...state.auth, ...action.payload };
      if (action.payload.token) {
        state.isAuthenticated = true;
      }
    },
    logout: (state) => {
      state.auth = {};
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("telzen_auth");
    },
    clearAuthState: (state) => {
      state.auth = {};
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("telzen_auth");
    },
    restoreAuthFromStorage: (state) => {
      const storedAuth = localStorage.getItem("telzen_auth");
      if (storedAuth) {
        const decryptedData = decryptValue(storedAuth);
        if (decryptedData) {
          try {
            const parsedAuth = JSON.parse(decryptedData);
            
            // Check if token is still valid (not expired)
            const currentTime = Math.floor(Date.now() / 1000);
            if (parsedAuth.expireAt && parsedAuth.expireAt > currentTime) {
              state.auth = parsedAuth;
              state.isAuthenticated = true;
            } else {
              // Token expired, clear storage
              localStorage.removeItem("telzen_auth");
            }
          } catch {
            // Invalid data, clear storage
            localStorage.removeItem("telzen_auth");
          }
        }
      }
    },
  },
});

export const {
  setLoading,
  setError,
  saveAuthData,
  initiateAuthData,
  updateAuth,
  logout,
  clearAuthState,
  restoreAuthFromStorage,
} = authSlice.actions;

export default authSlice.reducer;