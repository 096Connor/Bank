import axiosClient from "./axiosClient";

const API_URL = "/adresy";

export const getAdresy = async () => {
  const res = await axiosClient.get(API_URL);
  return res.data;
};

export const createAdres = async (data) => {
  const res = await axiosClient.post(API_URL, data);
  return res.data;
};
