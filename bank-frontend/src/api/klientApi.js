import axios from "axios";

const API_URL = "http://localhost:8080/api/klienci";

export const createKlient = async (data) => {
  return axios.post(API_URL, data);
};

export const getKlienci = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
