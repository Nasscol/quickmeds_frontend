import { env } from "@/config/env";
import axios from "axios";

const baseUrl = env.api
const userAPI = env.usersApi

export const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
})



// Refresh token logic on 401 response
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await axios.post(
          `${baseUrl}${userAPI}/auth/token/refresh/`,
          {},
          { withCredentials: true }
        );

        return api(originalRequest); // retry original request
      } catch (refreshError) {
        return Promise.reject(error);
      }
    }
     
    return Promise.reject(error);
  }
);

export default api;