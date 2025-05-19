import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { token: "" },
  reducers: {
    login(state, action) {
      state.token = action.payload;
    },
    logout(state) {
      state.token = "";
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
