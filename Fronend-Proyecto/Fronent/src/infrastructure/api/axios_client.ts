import axios from "axios";
import { tokenStorage } from "../storage/token_storage";

const API_URL = "http://127.0.0.1:8000";

export const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use((config) => {
  const token = tokenStorage.obtener();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      tokenStorage.eliminar();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);
