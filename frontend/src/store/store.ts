import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./user";
import transactionsReducer from "./transactions";

export const store = configureStore({
  reducer: {
    user: userReducer,
    transactions: transactionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
