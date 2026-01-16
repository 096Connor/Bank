import axiosClient from "./axiosClient";

export const loginKlient = async (data) =>
  axiosClient.post("/klienci/login", data).then((res) => res.data);
export const loginPracownik = async (data) =>
  axiosClient.post("/pracownicy/login", data).then((res) => res.data);
export const logout = async () => axiosClient.post("/klienci/logout");
export const me = async (role) => {
  if (role === "KLIENT") return axiosClient.get("/klienci/me").then((res) => res.data);
  return axiosClient.get("/pracownicy/me").then((res) => res.data);
};
