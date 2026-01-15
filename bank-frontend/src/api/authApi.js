import axiosClient from "./axiosClient";

/**
 * Logowanie pracownika
 * @param {Object} credentials - { email, password }
 * @returns {Promise<Object>} - dane pracownika
 */
export const loginPracownik = async (credentials) => {
  const res = await axiosClient.post("/pracownicy/login", credentials);
  return res.data;
};

/**
 * Logowanie klienta
 * @param {Object} credentials - { pesel, pin }
 * @returns {Promise<Object>} - dane klienta
 */
export const loginKlient = async (credentials) => {
  const res = await axiosClient.post("/klienci/login", credentials);
  return res.data;
};

/**
 * Alias login dla kompatybilności
 * Możesz go używać wszędzie jako "login"
 * Domyślnie loguje pracownika – zmień jeśli chcesz
 */
export const login = async (credentials) => {
  // Jeśli chcesz, żeby domyślnie logował klienta, zamień na loginKlient
  return loginPracownik(credentials);
};

/**
 * Wylogowanie
 */
export const logout = async () => {
  await axiosClient.post("/pracownicy/logout");
};

/**
 * Pobranie danych aktualnie zalogowanego pracownika
 */
export const me = async () => {
  const res = await axiosClient.get("/pracownicy/me");
  return res.data;
};
