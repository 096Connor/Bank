import axiosClient from "./axiosClient";

const API_URL = "/klienci";

/* =======================
   ISTNIEJĄCE – BEZ ZMIAN
   ======================= */

export const createKlient = async (data) => {
  return axiosClient.post(API_URL, data).then((res) => res.data);
};

export const getKlienci = async () => {
  return axiosClient.get(API_URL).then((res) => res.data);
};

export const getKlientById = async (id) => {
  return axiosClient.get(`${API_URL}/${id}`).then((res) => res.data);
};

// 🔹 Zostaje – prosta zmiana statusu klienta
export const changeKlientStatus = async (id, statusKonta) => {
  return axiosClient.put(`${API_URL}/${id}/status`, { statusKonta }).then((res) => res.data);
};

export const getMe = async () => {
  return axiosClient.get(`${API_URL}/me`).then((res) => res.data);
};

export const login = async (data) => {
  return axiosClient.post(`${API_URL}/login`, data).then((res) => res.data);
};

export const logoutKlient = async () => {
  return axiosClient.post(`${API_URL}/logout`).then((res) => res.data);
};

/* =======================
   NOWA FUNKCJA – AKCJA ADMINA
   ======================= */

// 🔥 BLOKUJE lub ZAMYKA klienta + WSZYSTKIE jego konta
// action: "ZABLOKUJ" | "ZAMKNIJ"
export const executeKlientAction = async (id, action) => {
  return axiosClient.put(`${API_URL}/${id}/action`, { action }).then((res) => res.data);
};
