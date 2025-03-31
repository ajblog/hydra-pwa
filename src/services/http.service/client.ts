import axiosInstance from "./config";
import Cookies from "js-cookie"; // Import js-cookie library if using it

interface ApiOptions {
  endpoint: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  data?: any;
  tokenRequired?: boolean;
  isFormData?: boolean;
}

export const apiClient = async ({
  endpoint,
  method = "GET",
  data,
  tokenRequired = false,
  isFormData = false,
}: ApiOptions) => {
  try {
    let requestData = data;

    // If isFormData is true, create FormData and add each part as JSON with "application/json" content type
    if (isFormData && data) {
      requestData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        // Append each top-level object as JSON with "application/json" content type
        const blob = new Blob([JSON.stringify(value)], {
          type: "application/json",
        });
        requestData.append(key, blob);
      });
    }

    // Set up headers with Authorization if tokenRequired
    const headers: any = isFormData
      ? { "Content-Type": "multipart/form-data" }
      : {};

    if (tokenRequired) {
      const accessToken = Cookies.get("access_token"); // Retrieve token from cookies
      if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    const response = await axiosInstance({
      url: endpoint,
      method,
      data: requestData,
      withCredentials: tokenRequired,
      headers, // Pass headers with authorization if needed
    });

    return response.data;
  } catch (error) {
    console.error("API request failed", error);
    throw error;
  }
};
