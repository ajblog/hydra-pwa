interface CookieOptions {
  /**
   * Number of days until the cookie expires
   */
  days?: number;
  /**
   * Path where the cookie is valid
   */
  path?: string;
  /**
   * Domain where the cookie is valid
   */
  domain?: string;
  /**
   * Whether the cookie should only be transmitted over HTTPS
   */
  secure?: boolean;
  /**
   * Controls when the cookie is sent in cross-site requests
   */
  sameSite?: "Strict" | "Lax" | "None";
}

/**
 * Sets a cookie with the given name, value, and options
 * @param name The name of the cookie
 * @param value The value to store
 * @param options Cookie configuration options
 */
function setCookie(name: string, value: string, options?: CookieOptions): void {
  const cookieParts = [
    `${encodeURIComponent(name)}=${encodeURIComponent(value)}`,
  ];

  if (options?.days) {
    const date = new Date();
    date.setTime(date.getTime() + options.days * 24 * 60 * 60 * 1000);
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

export { getCookie, setCookie };
