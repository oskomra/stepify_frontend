"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useDispatch } from "react-redux";

const AuthContext = createContext({
  token: null,
  user: null,
  login: () => {},
  logout: () => {},
  hasRole: () => {},
});

export default function AuthProvider({ children, initialToken }) {
  const [token, setToken] = useState(initialToken);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      if (token) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/user`,
            {
              credentials: "include",
            }
          );
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else if (response.status === 401) {
            setToken(null);
            setUser(null);
            delete axios.defaults.headers.common["Authorization"];
          }
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token]);

  useEffect(() => {
    axios.defaults.withCredentials = true;
  }, []);

  useEffect(() => {
    if (token)
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    else delete axios.defaults.headers.common["Authorization"];
  }, [token]);

  const hasRole = (requiredRole) => {
    if (!user) return false;
    return user.authority === requiredRole;
  };

  const login = (newToken, userData) => {
    dispatch({ type: "addresses/clearAddresses" });
    dispatch({ type: "addresses/clearSelectedAddress" });
    setToken(newToken);
    setUser(userData);
  };

  const logout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
      });
      if (response.ok) {
        setToken(null);
        setUser(null);
        dispatch({ type: "addresses/clearAddresses" });
        dispatch({ type: "addresses/clearSelectedAddress" });
        dispatch({ type: "cart/clearCart" });
        dispatch({ type: "cart/setCartQuantity", payload: 0 });

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
    <AuthContext.Provider
      value={{ token, user, login, logout, hasRole, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
