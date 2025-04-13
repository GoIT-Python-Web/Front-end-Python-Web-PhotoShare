import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCommentsToPost,
  fetchPostById,
  fetchPosts,
  deleteComment,
  sendComment,
  fetchPostsByFilters,
  fetchMyPosts,
  deletePost,
  createPost,
  uploadFilteredImage,
  generateQrCode,
  deleteCommentAsAdmin,
} from "./operations";
import { handlePending, handleRejected } from "../init.js";

const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    personalPosts: [],
    comments: [],
    post: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    clearPost(state) {
      state.post = null;
      state.comments = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, handlePending)
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, handleRejected)
      .addCase(fetchMyPosts.pending, handlePending)
      .addCase(fetchMyPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.personalPosts = action.payload;
      })
      .addCase(fetchMyPosts.rejected, handleRejected)
      .addCase(fetchPostById.pending, handlePending)
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.post = action.payload;
      })
      .addCase(fetchPostById.rejected, handleRejected)
      .addCase(fetchPostsByFilters.pending, handlePending)
      .addCase(fetchPostsByFilters.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (state.personalPosts) {
          state.personalPosts = state.personalPosts.filter(
            (post) => post.id !== action.payload
          );
        } else {
          state.posts = state.posts.filter(
            (post) => post.id !== action.payload
          );
        }
      })
      .addCase(sendComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
        state.error = null;
        state.isLoading = false;
      })
      .addCase(fetchCommentsToPost.pending, handlePending)
      .addCase(fetchCommentsToPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.comments = action.payload.filter(
          (comment) => !comment.is_deleted
        );
      })
      .addCase(fetchCommentsToPost.rejected, handleRejected)
      .addCase(deleteComment.pending, handlePending)
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.comments = state.comments.filter(
          (comment) => comment.id !== action.payload
        );
      })
      .addCase(deleteComment.rejected, handleRejected)
      .addCase(createPost.pending, handlePending)
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.personalPosts.unshift(action.payload);
      })
      .addCase(createPost.rejected, handleRejected)

      .addCase(uploadFilteredImage.pending, handlePending)
      .addCase(uploadFilteredImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(uploadFilteredImage.rejected, handleRejected)

      .addCase(generateQrCode.pending, handlePending)
      .addCase(generateQrCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(generateQrCode.rejected, handleRejected);
      .addCase(deleteCommentAsAdmin.pending, handlePending)
      .addCase(deleteCommentAsAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.comments = state.comments.filter(
          (comment) => comment.id !== action.payload
        );
      })
      .addCase(deleteCommentAsAdmin.rejected, handleRejected);
  },
});

export const { clearPost } = postSlice.actions;
export const postsReducer = postSlice.reducer;
