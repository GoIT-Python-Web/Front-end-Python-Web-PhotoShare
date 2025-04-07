import { createSlice } from "@reduxjs/toolkit";
import { fetchPosts } from "./operations";
import { handlePending, handleRejected } from "../init.js";

const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, handlePending)
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, handleRejected);
  },
});

export const postsReducer = postSlice.reducer;
