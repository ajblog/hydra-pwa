import { useEffect } from "react";
import { refreshTokenApi } from "../http.service";
import Cookies from "js-cookie";

export const useTokenRefresher = () => {
  useEffect(() => {
    const refreshToken = Cookies.get("refresh_token");
    const refresh = async () => {
      try {
        const res = await refreshTokenApi({ refresh: refreshToken });

        if (res?.access && res?.refresh) {
          Cookies.set("access_token", res.access);
          Cookies.set("refresh_token", res.refresh);
          console.log("🔥 Tokens successfully refreshed!");
        } else {
          console.warn("❗ Token refresh failed: no tokens in response");
          // optionally logout here
        }
      } catch (err) {
        console.error("💀 Token refresh error:", err);
        // optionally clear cookies + logout
      }
    };

    const interval = setInterval(refresh, 1 * 60 * 1000); // every 15 minutes

    return () => clearInterval(interval);
  }, []);
};
