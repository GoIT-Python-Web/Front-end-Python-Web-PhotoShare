import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance, handleError, setAuthHeader } from "../init.js";

// GET /admin/users
export const fetchUsers = createAsyncThunk(
  "users/fetchAll",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;
      if (!token) return thunkAPI.rejectWithValue("No token");
      setAuthHeader(token);

      const { data } = await instance.get("/admin/users");
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        handleError(err, "Не вдалося отримати список користувачів")
      );
    }
  }
);

// PUT /admin/users/{user_id}/ban
export const banUser = createAsyncThunk(
  "users/ban",
  async (userId, thunkAPI) => {
    try {
      await instance.put(`/admin/users/${userId}/ban`);
      return { userId };
    } catch (err) {
      return thunkAPI.rejectWithValue(
        handleError(err, "Не вдалося забанити користувача")
      );
    }
  }
);

// PUT / admin / toggle - role / { user_id };
export const toggleUserRole = createAsyncThunk(
  "users/toggleRole",
  async (userId, thunkAPI) => {
    try {
      await instance.put(`/admin/toggle-role/${userId}`);
      return { userId };
    } catch (err) {
      return thunkAPI.rejectWithValue(
        handleError(err, "Не вдалося змінити роль користувача")
      );
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (formData, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;
      if (!token) return thunkAPI.rejectWithValue("No token");
      setAuthHeader(token);

      const { data } = await instance.put("/users/edit_profile", formData);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        handleError(err, "Не вдалося оновити профіль")
      );
    }
  }
);
