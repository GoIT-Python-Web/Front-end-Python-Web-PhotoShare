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

export const fetchMyPosts = createAsyncThunk(
  "posts/fetchMy",
  async ({ id }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const persistedToken = state.auth.token;

      if (!persistedToken) {
        return thunkAPI.rejectWithValue("Unable to fetch user");
      }
      setAuthHeader(persistedToken);
      const { data } = await instance.get(`/posts/user/${id}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        handleError(err, "Failed to fetch users' posts")
      );
    }
  }
);

export const fetchPostsByFilters = createAsyncThunk(
  "posts/fetchByFilters",
  async (filters, thunkAPI) => {
    const { keyword, from_date, to_date, exact_star, sort_by, order } = filters;

    const queryParams = new URLSearchParams();

    if (keyword) queryParams.append("keyword", keyword);
    if (from_date) queryParams.append("from_date", from_date);
    if (to_date) queryParams.append("to_date", to_date);
    if (exact_star) queryParams.append("exact_star", exact_star);
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

export const editPost = createAsyncThunk(
  "posts/editPost",
  async ({ id, description }, thunkAPI) => {
    try {
      const data = await instance.put(`/posts/${id}`, { description });
      return data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        handleError(err, "Failed to update post")
      );
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/delete",
  async ({ id }, thunkAPI) => {
    try {
      await instance.delete(`/posts/${id}`);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        handleError(err, "Failed to fetch delete post")
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

export const deleteCommentAsAdmin = createAsyncThunk(
  "comments/deleteAsAdmin",
  async ({ id }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const persistedToken = state.auth.token;

      if (!persistedToken) {
        return thunkAPI.rejectWithValue("Unable to fetch user");
      }
      setAuthHeader(persistedToken);
      await instance.delete(`/admin/comments/${id}`);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        handleError(err, "Failed to delete comment as admin")
      );
    }
  }
);

export const addRating = createAsyncThunk(
  "rating/add",
  async ({ id, rating }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const persistedToken = state.auth.token;

      if (!persistedToken) {
        return thunkAPI.rejectWithValue("Unable to fetch user");
      }
      setAuthHeader(persistedToken);
      await instance.post(`/ratings/posts/${id}/rate`, {
        rating: rating,
      });
    } catch (err) {
      return thunkAPI.rejectWithValue(handleError(err, "Failed to add rating"));
    }
  }
);

export const createPost = createAsyncThunk(
  "posts/create",
  async (payload, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;
      if (!token) return thunkAPI.rejectWithValue("Unauthorized");
      setAuthHeader(token);

      const { data } = await instance.post("/posts/", payload);
      return data.image_url;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        handleError(err, "Failed to create post")
      );
    }
  }
);

export const uploadFilteredImage = createAsyncThunk(
  "posts/uploadFilteredImage",
  async ({ file, width, height, crop, effect }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;
      if (!token) return thunkAPI.rejectWithValue("Unauthorized");

      setAuthHeader(token);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("width", width);
      formData.append("height", height);
      formData.append("crop", crop);
      formData.append("effect", effect ?? "");
      const { data } = await instance.post(
        "/posts/upload-filtered-image/",
        formData
      );

      return data.image_url;
    } catch (err) {
      console.error("Upload filtered image error:", err.response?.data);
      return thunkAPI.rejectWithValue(
        handleError(err, "Failed to upload filtered image")
      );
    }
  }
);

export const generateQrCode = createAsyncThunk(
  "posts/generateQrCode",
  async (url, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;
      if (!token) return thunkAPI.rejectWithValue("Unauthorized");
      setAuthHeader(token);
      const { data } = await instance.post("/posts/generate-qr", {
        url,
      });
      return data.qr_code;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        handleError(err, "Failed to generate QR code")
      );
    }
  }
);
