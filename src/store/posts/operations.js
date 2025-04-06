import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleError, instance, setAuthHeader } from "../init.js";

export const fetchPosts = createAsyncThunk(
  "posts/fetchAll",
  async (_, thunkAPI) => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkNTYxOGFmMi05MTEzLTQzZDMtODJjYy0zZjRjYmNiMjFiOTQiLCJleHAiOjE3NDM5NDcyNjl9.y3M5LebshOOuh7nS0rYXV_msGtg9fGcv_dfZHgUz5hI";
    try {
      if (token) {
        setAuthHeader(token);
      } else {
        console.error("No token provided");
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
