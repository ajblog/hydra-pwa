/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient } from "../../client";

export const signupApi = async (data: any) => {
  return await apiClient({
    endpoint: "/auth/signup/",
    method: "POST",
    tokenRequired: false,
    data: data,
  });
};
