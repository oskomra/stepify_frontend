"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  hasRole: () => {},
  loading: true,
});

export default function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
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
          setUser(null);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const hasRole = (requiredRole) => {
    if (!user) return false;
    return user.authority === requiredRole;
  };

  const login = async (credentials) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (res.ok) {
        const userRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
          credentials: "include",
        });
        if (userRes.ok) {
          const data = await userRes.json();
          setUser(data.user);
        }
      } else {
        throw new Error("Login failed");
      }
    } catch (e) {
      console.error("Login error", e);
    }
  };

  const logout = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      if (response.ok) {
        setUser(null);
        dispatch({ type: "addresses/clearAddresses" });
        dispatch({ type: "addresses/clearSelectedAddress" });
        dispatch({ type: "cart/clearCart" });
        dispatch({ type: "cart/setCartQuantity", payload: 0 });
        router.push("/");
      }
    } catch (e) {
      console.error("Logout failed", e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, hasRole, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
