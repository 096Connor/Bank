import { useState, useEffect, useCallback } from "react";
import { AuthContext } from "./AuthContext";
import { loginKlient, loginPracownik, logout as apiLogout, me as apiMe } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import axiosClient from "../api/axiosClient";

export default function AuthProvider({ children }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
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
        } else {
          response = await loginKlient(credentials);
          localStorage.setItem("klient", JSON.stringify(response));
        }
        localStorage.setItem("role", type);
        setUser(response);
        setRole(type);

        enqueueSnackbar("Zalogowano pomyślnie!", { variant: "success" });

        setTimeout(() => {
          if (type === "PRACOWNIK") navigate("/");
          else navigate("/klient-home");
        }, 100);
        return response;
      } catch (err) {
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
    } catch {
    } finally {
      localStorage.removeItem("role");
      localStorage.removeItem("klient");
      localStorage.removeItem("pracownik");
      setUser(null);
      setRole(null);
      delete axiosClient.defaults.headers.common["Authorization"];
      navigate("/login");
    }
  }, [navigate]);

  const me = useCallback(async () => {
    if (!role) return null;
    try {
      const data = await apiMe(role);
      setUser(data);
      return data;
    } catch {
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
