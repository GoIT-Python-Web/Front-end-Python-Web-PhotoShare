import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const instance = axios.create({
  baseURL: "BACKEND_LINK",
});

export const setAuthHeader = (token) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  instance.defaults.headers.common.Authorization = "";
};
