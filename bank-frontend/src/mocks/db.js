// Mock database derived from dump-bank_db-202512291545.sql
const adresy = [
  {
    id: 1,
    ulica: "Testowa",
    nr_domu: "10",
    nr_mieszkania: null,
    miasto: "Warszawa",
    kod_pocztowy: "00-001",
    wojewodztwo: null,
    kraj: "Polska"
  },
  {
    id: 2,
    ulica: "KK",
    nr_domu: "17",
    nr_mieszkania: null,
    miasto: "K",
    kod_pocztowy: "09-79",
    wojewodztwo: "Malo",
    kraj: "PL"
  },
  {
    id: 3,
    ulica: "k",
    nr_domu: "a",
    nr_mieszkania: "a",
    miasto: "a",
    kod_pocztowy: "a",
    wojewodztwo: "a",
    kraj: "a"
  }
];

const klienci = [
  {
    id: 3,
    imie: "Jan",
    nazwisko: "Kowalski",
    dataUrodzenia: "1990-05-10",
    pesel: "90051012345",
    typKlienta: "STANDARD",
    dataRejestracji: "2025-11-28",
    statusKonta: "AKTYWNY",
    adresId: 1,
    nrTel: "123456789",
    mail: "jan.kowalski@example.com",
    narodowosc: "Polska",
    pinHash: null
  },
  {
    id: 5,
    imie: "Jan",
    nazwisko: "Kowalski",
    dataUrodzenia: "1990-05-10",
    pesel: "90051012345",
    typKlienta: "STANDARD",
    dataRejestracji: "2025-12-10",
    statusKonta: "AKTYWNY",
    adresId: 1,
    nrTel: "123456789",
    mail: "jan.kowalski@example.com",
    narodowosc: "Polska",
    pinHash: null
  },
  {
    id: 6,
    imie: "Jan",
    nazwisko: "Kowalski",
    dataUrodzenia: "1990-05-10",
    pesel: "90051012345",
    typKlienta: "STANDARD",
    dataRejestracji: "2025-12-10",
    statusKonta: "AKTYWNY",
    adresId: 1,
    nrTel: "123456789",
    mail: "jan.kowalski@example.com",
    narodowosc: "Polska",
    pinHash: null
  },
  {
    id: 7,
    imie: "ein",
    nazwisko: "ein",
    dataUrodzenia: "2025-12-03",
    pesel: "90051012345",
    typKlienta: "STANDARD",
    dataRejestracji: "2025-12-10",
    statusKonta: "AKTYWNY",
    adresId: 1,
    nrTel: "123456789",
    mail: "jan.kowalski@example.com",
    narodowosc: "Polska",
    pinHash: null
  },
  {
    id: 10,
    imie: "Jan",
    nazwisko: "Kowalski",
    dataUrodzenia: "1980-01-01",
    pesel: "90010112345",
    typKlienta: "STANDARD",
    dataRejestracji: "2025-12-27",
    statusKonta: "AKTYWNY",
    adresId: 1,
    nrTel: "+48600111222",
    mail: "jan.kowalski@example.com",
    narodowosc: "Polska",
    pinHash: "1234"
  },
  {
    id: 11,
    imie: "CON",
    nazwisko: "NOR",
    dataUrodzenia: "2018-02-28",
    pesel: "90051012345",
    typKlienta: "PREMIUM",
    dataRejestracji: "2025-12-29",
    statusKonta: "AKTYWNY",
    adresId: 2,
    nrTel: "+45 489 489 48",
    mail: "bb@gmail.co",
    narodowosc: "Polska",
    pinHash: null
  },
  {
    id: 12,
    imie: "TEST",
    nazwisko: "OWY",
    dataUrodzenia: "2014-01-04",
    pesel: "90051012345",
    typKlienta: "VIP",
    dataRejestracji: "2025-12-29",
    statusKonta: "AKTYWNY",
    adresId: 3,
    nrTel: "+45 489 489 48",
    mail: "bb@g.c",
    narodowosc: "Polska",
    pinHash:
      "$argon2id$v=19$m=16384,t=2,p=1$0SRIU9SAx8WqYq3Ye6aq5w$e9JqFC6+E8WYCvJ0C0iC7VtSszAhSRCKfBawRdmoTxI"
  }
];

// Konto, transakcje and others are empty in dump; provide empty arrays for now
const konta = [];
const transakcje = [];
const kontaktyPrzelewowe = [];
const karty = [];

export default {
  adresy,
  klienci,
  konta,
  transakcje,
  kontaktyPrzelewowe,
  karty
};

export function getKlientById(id) {
  return klienci.find((k) => Number(k.id) === Number(id)) || null;
}

export function getAdresById(id) {
  return adresy.find((a) => Number(a.id) === Number(id)) || null;
}

export function getKontaByKlientId(klientId) {
  return konta.filter((k) => Number(k.id_klienta) === Number(klientId));
}

export function getTransakcjeByKonto(nrKonta) {
  return transakcje.filter((t) => Number(t.id_konta) === Number(nrKonta));
}
