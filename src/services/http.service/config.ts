import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  AxiosRequestConfig,
} from "axios";
import { getCookie, isTokenExpired, setCookie } from "../../utils";
import { showErrorToast } from "../../components";

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
      originalRequest.url !== "/auth/login/refresh/"
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = getCookie("refresh_token");
        if (!refreshToken || isTokenExpired(refreshToken)) {
          window.location.reload();
          return Promise.reject(error);
        }

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

        setCookie("access_token", access, { minutes: 15 });
        setCookie("refresh_token", refresh, { days: 7 });

        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers["Authorization"] = `Bearer ${access}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        return Promise.reject(refreshError);
      }
    }

    // 🌐 Network or CORS error
    if (!error.response) {
      if (error.code === "ERR_NETWORK") {
        showErrorToast("اتصال اینترنت خود را بررسی کنید.");
      } else {
        showErrorToast("ارتباط با سرور برقرار نشد. لطفاً دوباره تلاش کنید.");
      }
    } else {
      switch (error.response.status) {
        case 403:
          console.error("Forbidden - insufficient permissions");
          break;
        case 429:
          showErrorToast("لطفاً چند لحظه صبر کنید.");
          break;
        case 500:
          showErrorToast("خطای سرور! لطفاً بعداً امتحان کنید.");
          break;
        default:
          showErrorToast("مشکلی پیش آمده. لطفاً دوباره تلاش کنید.");
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
