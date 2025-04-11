import { objectToQueryString } from "../../../utils";
import { apiClient } from "../client";

export const getAllStations = async () => {
  return await apiClient({
    endpoint: "/data/stations/",
    method: "GET",
    tokenRequired: true,
  });
};

export const getSingleStationDetails = async (data: Record<string, string>) => {
  return await apiClient({
    endpoint: `/data/station-data/${objectToQueryString(data, true)}`,
    method: "GET",
    tokenRequired: true,
  });
};
export const getRoutesInformation = async (data: {
  start: string;
  end: string;
}) => {
  return await apiClient({
    endpoint: `/data/routes/${objectToQueryString(data, true)}`,
    method: "GET",
    tokenRequired: true,
  });
};
