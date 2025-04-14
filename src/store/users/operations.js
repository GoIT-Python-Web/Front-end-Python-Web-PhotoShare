import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance, handleError, setAuthHeader } from "../init.js";

// PUT /admin/users/{user_id}/ban
export const banUser = createAsyncThunk(
  "users/ban",
  async (userId, thunkAPI) => {
    try {
      console.log(userId);
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

export const searchUsers = createAsyncThunk(
  "users/search",
  async (filters, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;

      if (!token) return thunkAPI.rejectWithValue("No token");
      setAuthHeader(token);

      const params = new URLSearchParams();

      if (filters.search) params.append("search", filters.search);
      if (filters.role) params.append("role", filters.role);
      if (filters.reg_date_from)
        params.append("reg_date_from", filters.reg_date_from);
      if (filters.reg_date_to)
        params.append("reg_date_to", filters.reg_date_to);
      if (filters.sort_by)
        params.append(
          "sort_by",
          filters.sort_by === "date" ? "registration_date" : filters.sort_by
        );
      if (filters.sort_order) params.append("sort_order", filters.sort_order);

      const { data } = await instance.get(
        `/admin/users/search?${params.toString()}`
      );
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        handleError(err, "Не вдалося знайти користувачів")
      );
    }
  }
);
