import axios from "axios";
import { logout } from "./auth/slice.js";
import { refreshTokens } from "./auth/operations.js";

export const instance = axios.create({
  baseURL: "https://damp-giovanna-photohsare-3ee4d857.koyeb.app",
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      store.getState().auth.refreshToken
    ) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await store.dispatch(refreshTokens()).unwrap();

        setAuthHeader(newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return instance(originalRequest);
      } catch (refreshError) {
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

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
