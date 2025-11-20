import { configureStore } from '@reduxjs/toolkit';
import authReducer from './modules/auth/authSlice';
import uiReducer from './modules/ui/uiSlice';
import destinationReducer from './modules/destination/destinationSlice';
import { apiSlice } from './modules/api/apiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    destination: destinationReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PURGE',
        ],
      },
    }).concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;