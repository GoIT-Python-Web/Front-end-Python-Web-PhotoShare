import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser, getUser, refreshTokens } from "./operations";
import { handlePending, handleRejected } from "../init.js";
import { updateUser } from "./operations.js";

const initialState = {
  user: null,
  token: null,
  refreshToken: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateTokens: (state, action) => {
      state.token = action.payload.access_token;
      state.refreshToken = action.payload.refresh_token;
    },
    logout: (state) => {
      state.token = null;
      state.refreshToken = null;
      state.user = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, handlePending)
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, handleRejected)

      .addCase(loginUser.pending, handlePending)
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;
        state.isLoading = false;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.token = null;
        state.refreshToken = null;
        state.isLoggedIn = false;
        handleRejected(state, action);
      })

      .addCase(getUser.pending, handlePending)
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.user = null;
        state.isLoggedIn = false;
        handleRejected(state, action);
      })
      .addCase(refreshTokens.pending, handlePending)

      .addCase(refreshTokens.fulfilled, (state, action) => {
        state.token = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(refreshTokens.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.token = null;
        state.refreshToken = null;
        handleRejected(state, action);
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

export const { updateTokens, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
