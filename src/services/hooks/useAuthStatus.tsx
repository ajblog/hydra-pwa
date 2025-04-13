// hooks/useAuthStatus.ts
import { useEffect, useState } from "react";
import { getCookie, setCookie } from "../../utils";
import { refreshTokenApi } from "../http.service";

export const useAuthStatus = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const hasAccess = document.cookie.includes("access_token");
      const hasRefresh = document.cookie.includes("refresh_token");

      if (!hasAccess && hasRefresh) {
        try {
          const refreshToken = getCookie("refresh_token");
          const { access, refresh } = await refreshTokenApi({
            refresh: refreshToken,
          });

          setCookie("access_token", access, { minutes: 15 });
          setCookie("refresh_token", refresh, { days: 7 });
          setIsAuthenticated(true);
        } catch (err) {
          console.error("🔥 Refresh token invalid:", err);
          setIsAuthenticated(false);
        }
      } else if (hasAccess) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }

      setIsLoading(false);
    };

    checkAuth();
  }, []);

  return { isLoading, isAuthenticated };
};
