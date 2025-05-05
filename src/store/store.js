import { configureStore } from "@reduxjs/toolkit";

import transactionsReducer from "./transactions";

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
  },
});
