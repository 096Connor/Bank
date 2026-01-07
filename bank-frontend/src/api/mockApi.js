import db, { getKlientById, getKontaByKlientId, getTransakcjeByKonto } from "../mocks/db";

const delay = (ms = 100) => new Promise((res) => setTimeout(res, ms));

export async function fetchKlientById(id) {
  await delay();
  return getKlientById(id);
}

export async function fetchKontaByKlientId(id) {
  await delay();
  return getKontaByKlientId(id);
}

export async function fetchTransakcjeByKonto(nrKonta) {
  await delay();
  return getTransakcjeByKonto(nrKonta);
}

export async function fetchAllKlienci() {
  await delay();
  return db.klienci;
}

export default {
  fetchKlientById,
  fetchKontaByKlientId,
  fetchTransakcjeByKonto,
  fetchAllKlienci
};
