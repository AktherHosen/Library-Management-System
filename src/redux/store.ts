import { configureStore } from "@reduxjs/toolkit";
import { lmsApi } from "./api/lmsApi";

export const store = configureStore({
  reducer: {
    [lmsApi.reducerPath]: lmsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(lmsApi.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
