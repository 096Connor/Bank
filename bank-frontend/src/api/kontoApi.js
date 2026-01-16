import axiosClient from "./axiosClient";

export const getKontaForKlient = async (id) => {
  return axiosClient.get(`/konta/klient/${id}`).then((res) => res.data);
};

export const getMyKonta = async () => {
  return axiosClient.get(`/konta/me`).then((res) => res.data);
};

export const createKonto = async (id, oprocentowanie) => {
  return axiosClient.post(`/konta/klient/${id}`, { oprocentowanie }).then((res) => res.data);
};

export const changeKontoStatus = async (kontoId, status) => {
  return axiosClient.put(`/konta/${kontoId}/status`, { status }).then((res) => res.data);
};
export const wplataNaKonto = async (kontoId, kwota) => {
  return axiosClient.put(`/konta/${kontoId}/wplata`, { kwota }).then((res) => res.data);
};
