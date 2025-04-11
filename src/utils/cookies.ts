/**
 * Sets a cookie with the given name, value, and options
 * @param name The name of the cookie
 * @param value The value to store
 * @param options Cookie configuration options
 */
type CookieOptions = {
  days?: number;
  minutes?: number;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: "lax" | "strict" | "none";
};

function setCookie(name: string, value: string, options?: CookieOptions): void {
  const cookieParts = [
    `${encodeURIComponent(name)}=${encodeURIComponent(value)}`,
  ];

  if (options?.days || options?.minutes) {
    const date = new Date();
    let expiresInMs = 0;

    if (options.days) {
      expiresInMs += options.days * 24 * 60 * 60 * 1000;
    }

    if (options.minutes) {
      expiresInMs += options.minutes * 60 * 1000;
    }

    date.setTime(date.getTime() + expiresInMs);
    cookieParts.push(`expires=${date.toUTCString()}`);
  }

  if (options?.path) {
    cookieParts.push(`path=${options.path}`);
  }

  if (options?.domain) {
    cookieParts.push(`domain=${options.domain}`);
  }

  if (options?.secure) {
    cookieParts.push("secure");
  }

  if (options?.sameSite) {
    cookieParts.push(`samesite=${options.sameSite.toLowerCase()}`);
  }

  document.cookie = cookieParts.join("; ");
}

/**
 * Gets the value of a cookie by name
 * @param name The name of the cookie to retrieve
 * @returns The cookie value or null if not found
 */
function getCookie(name: string): string | null {
  const nameEQ = `${encodeURIComponent(name)}=`;
  const ca = document.cookie.split(";");

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length));
    }
  }

  return null;
}

function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  } catch (error) {
    console.error("Invalid token format:", error);
    return true; // Treat as expired if invalid
  }
}

export { getCookie, setCookie, isTokenExpired };
