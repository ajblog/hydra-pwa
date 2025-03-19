const objectToQueryString = (obj: any, isStarted = false) => {
  // Remove any empty string properties from the object
  Object.keys(obj).forEach((key) => obj[key] === "" && delete obj[key]);

  if (obj) {
    return Object.keys(obj)
      .flatMap((key, id) => {
        const value = obj[key];

        // Handle array values
        if (Array.isArray(value)) {
          return value.map((item) => {
            return `${isStarted && id === 0 ? "?" : "&"}${encodeURIComponent(
              key
            )}=${encodeURIComponent(item)}`;
          });
        } else if (value !== null && value !== undefined) {
          return [
            `${isStarted && id === 0 ? "?" : "&"}${encodeURIComponent(
              key
            )}=${encodeURIComponent(value)}`,
          ];
        } else {
          return [];
        }
      })
      .join("");
  }

  return "";
};

export { objectToQueryString };
