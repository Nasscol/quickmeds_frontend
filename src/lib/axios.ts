import { env } from "@/config/env";
import axios from "axios";

const baseUrl = env.api
const userAPI = env.usersApi

export const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
})

const isAuthRequest = (config: any) => {
  return config?.url?.includes("/auth/login/");
};

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};




// Refresh token logic on 401 response
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry && !isAuthRequest(originalRequest)) {

      if (isRefreshing) {
        // Queue request until refresh is done
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: () => resolve(api(originalRequest)),
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await axios.post(`${baseUrl}${userAPI}/auth/token/refresh/`,{},{ withCredentials: true });

        processQueue(null);
        return api(originalRequest);

      } catch (refreshError) {
        processQueue(refreshError);

        if (window.location.pathname !== "/login") {
          await axios.post(`${baseUrl}${userAPI}/auth/logout/`,  {},  { withCredentials: true });
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);

      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;