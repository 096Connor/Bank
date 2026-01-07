import axiosClient from "./axiosClient";

export const login = async (credentials) => {
  const payload = {
    login: credentials.login,
    haslo: credentials.password ?? credentials.haslo
  };

  const response = await axiosClient.post("/auth/login", payload);
  return response.data;
};
