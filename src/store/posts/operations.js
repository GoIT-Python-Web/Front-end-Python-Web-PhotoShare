import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleError, instance, setAuthHeader } from "../init.js";

export const fetchPosts = createAsyncThunk(
  "posts/fetchAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await instance.get("/posts/");
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        handleError(err, "Failed to fetch posts")
      );
    }
  }
);

export const fetchPostsByFilters = createAsyncThunk(
  "posts/fetchByFilters",
  async (filters, thunkAPI) => {
    const { keyword, tags, from_date, to_date, sort_by, order } = filters;

    const queryParams = new URLSearchParams();

    if (keyword) queryParams.append("keyword", keyword);
    if (tags) queryParams.append("tags", tags.join(","));
    if (from_date) queryParams.append("from_date", from_date);
    if (to_date) queryParams.append("to_date", to_date);
    if (sort_by) queryParams.append("sort_by", sort_by);
    if (order) queryParams.append("order", order);

    try {
      const { data } = await instance.get(
        `/posts/search?${queryParams.toString()}`
      );
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        handleError(err, "Failed to fetch posts by filters")
      );
    }
  }
);

export const fetchPostById = createAsyncThunk(
  "posts/fetchById",
  async ({ id }, thunkAPI) => {
    try {
      const { data } = await instance.get(`/posts/${id}`);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        handleError(err, "Failed to fetch post by id")
      );
    }
  }
);

export const sendComment = createAsyncThunk(
  "comments/send",
  async ({ id, message }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const persistedToken = state.auth.token;

      if (!persistedToken) {
        return thunkAPI.rejectWithValue("Unable to fetch user");
      }
      setAuthHeader(persistedToken);
      const { data } = await instance.post(`/posts/${id}/comments`, {
        message,
      });
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        handleError(err, "Failed to send comment")
      );
    }
  }
);

export const fetchCommentsToPost = createAsyncThunk(
  "comments/fetchToPost",
  async ({ id }, thunkAPI) => {
    try {
      const { data } = await instance.get(`/posts/${id}/comments`);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        handleError(err, "Failed to fetch comments to post")
      );
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comments/delete",
  async ({ id }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const persistedToken = state.auth.token;

      if (!persistedToken) {
        return thunkAPI.rejectWithValue("Unable to fetch user");
      }
      setAuthHeader(persistedToken);
      await instance.delete(`/posts/comments/${id}`);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        handleError(err, "Failed to delete comment")
      );
    }
  }
);
