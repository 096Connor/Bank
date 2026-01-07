import axiosClient from "./axiosClient";

const API_URL = "/klienci";

export const createKlient = async (data) => {
  const response = await axiosClient.post(API_URL, data);
  return response.data;
};

export const getKlienci = async () => {
  const response = await axiosClient.get(API_URL);
  return response.data;
};
