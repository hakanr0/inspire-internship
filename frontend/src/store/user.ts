import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { User } from "../types/userTypes";

const initialState: User = {
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    logout(state) {
      state.token = "";
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
