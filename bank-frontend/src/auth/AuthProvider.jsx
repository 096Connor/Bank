import { useState, useEffect, useCallback } from "react";
import { AuthContext } from "./AuthContext";
import { loginPracownik, loginKlient, logout as apiLogout, me as apiMe } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import axiosClient from "../api/axiosClient";

export default function AuthProvider({ children }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [user, setUser] = useState(() => {
    const storedRole = localStorage.getItem("role");
    if (!storedRole) return null;
    const key = storedRole === "KLIENT" ? "klient" : "pracownik";
    const storedUser = localStorage.getItem(key);
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [role, setRole] = useState(localStorage.getItem("role"));
  const [loading, setLoading] = useState(false);

  // Ustaw token w axios po zalogowaniu
  useEffect(() => {
    if (user && user.token) {
      axiosClient.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
    } else {
      delete axiosClient.defaults.headers.common["Authorization"];
    }
  }, [user]);

  const login = useCallback(
    async ({ type, credentials }) => {
      if (loading) return;
      setLoading(true);
      try {
        let response;
        if (type === "PRACOWNIK") {
          response = await loginPracownik(credentials);
          localStorage.setItem("pracownik", JSON.stringify(response));
        } else if (type === "KLIENT") {
          response = await loginKlient(credentials);
          localStorage.setItem("klient", JSON.stringify(response));
        } else {
          throw new Error("Nieznany typ logowania");
        }

        localStorage.setItem("role", type);
        setUser(response);
        setRole(type);

        enqueueSnackbar("Zalogowano pomyślnie!", { variant: "success" });

        setTimeout(() => {
          if (type === "PRACOWNIK") navigate("/pracownik-home");
          if (type === "KLIENT") navigate("/klient-home");
        }, 100);

        return response;
      } catch (err) {
        console.error("Błąd logowania:", err);
        enqueueSnackbar("Nieprawidłowe dane logowania", { variant: "error" });
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [loading, enqueueSnackbar, navigate]
  );

  const logout = useCallback(async () => {
    try {
      await apiLogout();
    } catch (err) {
      console.warn("Logout API error:", err);
    } finally {
      localStorage.removeItem("role");
      localStorage.removeItem("klient");
      localStorage.removeItem("pracownik");
      setUser(null);
      setRole(null);
      delete axiosClient.defaults.headers.common["Authorization"];
      navigate("/");
    }
  }, [navigate]);

  const me = useCallback(async () => {
    if (!role) return null;
    try {
      const data = await apiMe();
      setUser(data);
      const key = role === "KLIENT" ? "klient" : "pracownik";
      localStorage.setItem(key, JSON.stringify(data));
      return data;
    } catch (err) {
      console.error("Błąd pobierania danych:", err);
      return null;
    }
  }, [role]);

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, role, login, logout, me, loading, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
