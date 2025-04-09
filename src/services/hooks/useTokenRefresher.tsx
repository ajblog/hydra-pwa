import { useEffect } from "react";
import { refreshTokenApi } from "../http.service";
import Cookies from "js-cookie";

export const useTokenRefresher = () => {
  const refreshToken = Cookies.get("refresh_token");
  useEffect(() => {
    const interval = setInterval(
      async () => {
        const res = await refreshTokenApi({ refresh: refreshToken });
        if (res) {
          Cookies.set("access_token", res.access);
          Cookies.set("refresh_token", res.refresh);
        }
      },
      15 * 60 * 1000
    ); // 15 minutes

    return () => clearInterval(interval);
  }, [refreshToken]);
};
