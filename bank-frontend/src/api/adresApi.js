import axiosClient from "./axiosClient";

const API_URL = "/adresy";

export const getAdresy = async () => {
  const response = await axiosClient.get(API_URL);
  return response.data;
};

export const createAdres = async (data) => {
  const response = await axiosClient.post(API_URL, data);
  return response.data;
};
