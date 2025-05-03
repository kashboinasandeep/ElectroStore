import axios from "axios";
import { BASE_URL } from "./HelperService";
import { getTokenFromLocalStorage } from "../Auth/HelperAuth";

export const publicAxios = axios.create({
  baseURL: BASE_URL,
});

export const privateAxios = axios.create({
  baseURL: BASE_URL,
});

// Add token to privateAxios requests
privateAxios.interceptors.request.use(
    (config) => {
      const token = getTokenFromLocalStorage();
      if (token) {
        if (!config.headers) {
          config.headers = {}; // Ensure headers exist
        }
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  