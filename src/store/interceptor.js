import { refreshTokens } from "./auth/operations.js";
import { logout } from "./auth/slice.js";

export const setupInterceptors = (instance, store) => {
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
};
