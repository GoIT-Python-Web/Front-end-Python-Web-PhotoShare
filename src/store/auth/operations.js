import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleError, instance, setAuthHeader } from "../init.js";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await instance.post("/register", credentials);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        handleError(err, "Failed to register user")
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await instance.post("/login", credentials);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        handleError(err, "Failed to register user")
      );
    }
  }
);

export const getUser = createAsyncThunk("auth/me", async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (!persistedToken) {
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }
    setAuthHeader(persistedToken);
    const { data } = await instance.get("users/me");
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(
      handleError(err, "Failed to register user")
    );
  }
});

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (updatedData, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;

      if (!token) {
        return thunkAPI.rejectWithValue("Користувач не авторизований");
      }

      setAuthHeader(token);
      const { data } = await instance.patch("/users/edit_profile", updatedData);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        handleError(err, "Не вдалося оновити дані користувача")
      );
    }
  }
);

export const refreshTokens = createAsyncThunk(
  "auth/refreshTokens",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const refreshToken = state.auth.refreshToken;

      if (!refreshToken) {
        return thunkAPI.rejectWithValue("No refresh token available");
      }

      const { data } = await instance.post("/auth/refresh", {
        refresh_token: refreshToken,
      });

      thunkAPI.dispatch(updateTokens(data));
      return data.access_token;
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to refresh tokens");
    }
  }
);
