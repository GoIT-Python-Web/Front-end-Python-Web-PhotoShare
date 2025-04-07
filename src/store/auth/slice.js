import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser } from "./operations";
import { handlePending, handleRejected } from "../init.js";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: [],
    token: null,
    isLoggedIn: false,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        handlePending, (state.isLoggedIn = false);
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state) => {
        handleRejected, (state.isLoggedIn = false);
      })
      .addCase(loginUser.pending, (state) => {
        handlePending, (state.isLoggedIn = false);
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload;
        state.isLoading = false;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state) => {
        handleRejected, (state.isLoggedIn = false), (state.token = null);
      });
  },
});

export const authReducer = authSlice.reducer;
