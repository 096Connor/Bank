import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { login as loginApi } from "../api/authApi";
import axiosClient from "../api/axiosClient";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    if (user && user.token) {
      axiosClient.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
    }
  }, [user]);

  const login = async (credentials) => {
    const data = await loginApi(credentials);
    if (data) {
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      if (data.token) {
        axiosClient.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      }
    }
    return data;
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    delete axiosClient.defaults.headers.common["Authorization"];
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
