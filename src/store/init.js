import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export const instance = axios.create({
  baseURL: BASE_URL,
});

export const setAuthHeader = (token) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  instance.defaults.headers.common.Authorization = "";
};

export const handleError = (error, defaultMessage) => {
  return error instanceof Error ? error.message : defaultMessage;
};

export const handlePending = (state) => {
  state.isLoading = true;
};

export const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload || "An unknown error occurred";
};
