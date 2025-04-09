import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser, getUser } from "./operations";
import { handlePending, handleRejected } from "../init.js";
import { updateUser } from "./operations.js";

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
        state.isLoading = false;
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
      })
      .addCase(getUser.pending, (state) => {
        handlePending, (state.isLoggedIn = false);
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
        state.isLoggedIn = true;
        state.isLoading = null;
      })
      .addCase(getUser.rejected, (state) => {
        handleRejected, (state.isLoggedIn = false);
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const authReducer = authSlice.reducer;
