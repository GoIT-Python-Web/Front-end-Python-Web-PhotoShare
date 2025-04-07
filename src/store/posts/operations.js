import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleError, instance, setAuthHeader } from "../init.js";

export const fetchPosts = createAsyncThunk(
  "posts/fetchAll",
  async (_, thunkAPI) => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkNTYxOGFmMi05MTEzLTQzZDMtODJjYy0zZjRjYmNiMjFiOTQiLCJleHAiOjE3NDM5NjY0MjR9.m2PdDbb-kIcoaMbWF2Lu4WOz_qrqDhjU2BnF7fEw0Y0";
    try {
      if (token) {
        setAuthHeader(token);
      }
      const { data } = await instance.get("/posts");
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        handleError(err, "Failed to fetch posts")
      );
    }
  }
);
