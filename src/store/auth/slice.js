import { createSlice } from "@reduxjs/toolkit";
import {
  registerUser,
  loginUser,
  getUser,
  refreshTokens,
  fetchUserById,
} from "./operations";
import { handlePending, handleRejected } from "../init.js";
import { updateUser } from "./operations.js";
import { toggleUserRole, banUser } from "../users/operations.js";

const initialState = {
  user: null,
  profile: null,
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
      state.token = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
    },
    clearProfile: (state) => {
      state.profile = null;
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
        state.token = action.payload;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(refreshTokens.rejected, (state, action) => {
        state.isLoggedIn = false;
        handleRejected(state, action);
      })
      .addCase(banUser.fulfilled, (state) => {
        state.profile.is_active = !state.profile.is_active;
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
      })
      .addCase(fetchUserById.pending, handlePending)
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.isLoading = false;
      })
      .addCase(toggleUserRole.fulfilled, (state) => {
        if (state.profile) {
          state.profile.type =
            state.profile.type === "admin" ? "user" : "admin";
        } else {
          state.user.type === "admin" ? "user" : "admin";
        }
        state.isLoading = false;
      });
  },
});

export const { updateTokens, logout, clearProfile } = authSlice.actions;
export const authReducer = authSlice.reducer;
