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

export const logoutApi = async (data: any) => {
  return await apiClient({
    endpoint: "/auth/logout/",
    method: "POST",
    tokenRequired: true,
    data: data,
  });
};

export const loginApi = async (data: any) => {
  return await apiClient({
    endpoint: "/auth/login/",
    method: "POST",
    tokenRequired: false,
    data: data,
  });
};

export const getProfileApi = async () => {
  return await apiClient({
    endpoint: "/auth/profile/",
    method: "GET",
    tokenRequired: true,
  });
};

export const refreshTokenApi = async (data: any) => {
  return await apiClient({
    endpoint: "/auth/login/refresh/",
    method: "POST",
    tokenRequired: false,
    data: data,
  });
};

export const changePasswordApi = async (data: any) => {
  return await apiClient({
    endpoint: "/auth/changepassword/",
    method: "POST",
    tokenRequired: true,
    data: data,
  });
};

export const updateProfileApi = async (data: any) => {
  return await apiClient({
    endpoint: "/auth/profile/update/",
    method: "PUT",
    tokenRequired: true,
    data: data,
  });
};
