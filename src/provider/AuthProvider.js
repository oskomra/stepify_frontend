"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useDispatch } from "react-redux";

const AuthContext = createContext({
  token: null,
  login: () => {},
  logout: () => {},
});

export default function AuthProvider({ children, initialToken }) {
  const [token, setToken] = useState(initialToken);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    axios.defaults.withCredentials = true;
  }, []);

  useEffect(() => {
    if (token)
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    else delete axios.defaults.headers.common["Authorization"];
  }, [token]);

  const login = (newToken) => {
    dispatch({ type: "addresses/clearAddresses" });
    dispatch({ type: "addresses/clearSelectedAddress" });
    setToken(newToken);
  };

  const logout = async () => {
    try {
      const response = await fetch("http://localhost:8080/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        setToken(null);
        dispatch({ type: "addresses/clearAddresses" });
        dispatch({ type: "addresses/clearSelectedAddress" });
        router.push("/");
      }
      if (response.status === 401) {
        console.error("Unauthorized logout attempt");
      }
    } catch (e) {
      console.error("Logout failed", e);
    }
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
