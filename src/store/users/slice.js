import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers, banUser, toggleUserRole } from "./operations";

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.items = payload;
      })
      .addCase(fetchUsers.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(banUser.fulfilled, (state, { payload }) => {
        const user = state.items.find((u) => u.id === payload.userId);
        if (user) user.is_active = false;
      })
      .addCase(toggleUserRole.fulfilled, (state, { payload }) => {
        const user = state.items.find((u) => u.id === payload.userId);
        if (user) {
          user.type = user.type === "admin" ? "user" : "admin";
        }
      });
  },
});

export const usersReducer = usersSlice.reducer;
