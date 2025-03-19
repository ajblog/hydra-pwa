import { objectToQueryString } from "../../../utils";
import { apiClient } from "../client";

export const getAllStations = async () => {
  return await apiClient({
    endpoint: "/all-stations",
    method: "GET",
    tokenRequired: false,
  });
};

export const getSingleStationDetails = async (data: any) => {
  return await apiClient({
    endpoint: `/station-test${objectToQueryString(data, true)}`,
    method: "GET",
    tokenRequired: false,
  });
};
