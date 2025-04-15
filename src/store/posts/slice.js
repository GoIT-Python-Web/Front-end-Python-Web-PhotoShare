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
  addRating,
  editPost,
} from "./operations";
import { handlePending, handleRejected } from "../init.js";

const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    personalPosts: [],
    temporaryLink: null,
    qr: null,
    url: null,
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
    clearLink(state) {
      state.temporaryLink = null;
      state.url = null;
      state.qr = null;
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
        const id = action.payload;

        state.personalPosts = state.personalPosts?.filter(
          (post) => post.id !== id
        );
        state.posts = state.posts?.filter((post) => post.id !== id);
      })
      .addCase(sendComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
        state.error = null;
        state.isLoading = false;
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.post = action.payload;
      })
      .addCase(addRating.rejected, handleRejected)
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
        state.url = action.payload;
      })
      .addCase(createPost.rejected, handleRejected)

      .addCase(uploadFilteredImage.pending, handlePending)
      .addCase(uploadFilteredImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.temporaryLink = action.payload;
      })
      .addCase(uploadFilteredImage.rejected, handleRejected)

      .addCase(generateQrCode.pending, handlePending)
      .addCase(generateQrCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.qr = action.payload;
        state.error = null;
      })
      .addCase(generateQrCode.rejected, handleRejected)
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

export const { clearPost, clearLink } = postSlice.actions;
export const postsReducer = postSlice.reducer;
