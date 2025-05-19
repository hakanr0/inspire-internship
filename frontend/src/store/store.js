import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./user";
import transactionsReducer from "./transactions";

export const store = configureStore({
  reducer: {
    user: userReducer,
    transactions: transactionsReducer,
  },
});
