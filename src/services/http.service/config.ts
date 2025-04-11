import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  AxiosRequestConfig,
} from "axios";
import { getCookie, isTokenExpired, setCookie } from "../../utils";

// Base URL for API requests
const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://185.105.103.245:65402/api";

// Create an Axios instance with default configuration
const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// // Add a request interceptor to attach access token to headers
// axiosInstance.interceptors.request.use(
//   (config: AxiosRequestConfig) => {
//     const accessToken = getCookie("access_token");
//     if (accessToken && !config.headers["Authorization"]) {
//       config.headers["Authorization"] = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (error: AxiosError) => Promise.reject(error)
// );

// Add a response interceptor for global error handling and token refresh
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "/auth/login/refresh/" // Prevent infinite loop
    ) {
      originalRequest._retry = true; // Mark as retried

      try {
        const refreshToken = getCookie("refresh_token");
        if (!refreshToken || isTokenExpired(refreshToken)) {
          console.error("Refresh token missing or expired");
          // Optionally redirect to login
          window.location.reload();
          return Promise.reject(error);
        }

        // Make a fetch request to refresh tokens
        const response = await fetch(`${BASE_URL}/auth/login/refresh/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refresh: refreshToken }),
        });

        if (!response.ok) {
          throw new Error(`Refresh token request failed: ${response.status}`);
        }

        const data = await response.json();
        const { access, refresh } = data;

        // Set new tokens in cookies
        setCookie("access_token", access, {
          minutes: 15, // 15 minutes expiry for access token
        });

        setCookie("refresh_token", refresh, {
          days: 7, // Assuming refresh token lasts longer, e.g., 7 days
        });

        // Update Authorization header for the original request
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers["Authorization"] = `Bearer ${access}`;

        // Retry the original request
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        // Optionally redirect to login
        return Promise.reject(refreshError);
      }
    }

    // Handle other errors
    if (error.response) {
      console.error("API Error:", error.response.data);
      switch (error.response.status) {
        case 403:
          console.error("Forbidden - insufficient permissions");
          break;
        case 500:
          console.error("Server error - try again later");
          break;
        default:
          console.error("An unknown error occurred");
      }
    } else {
      console.error("Network error or no response");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
