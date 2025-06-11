"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/provider/AuthProvider";

export function ProtectedRoute({ children }) {
  const { token } = useAuth();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!token) {
      router.replace("/login");
    } else {
      setIsAuthorized(true);
    }
  }, [token, router]);

  if (!isAuthorized) {
    return null;
  }

  return children;
}

export function AdminRoute({ children }) {
  const { token, user } = useAuth();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        router.replace("/login");
        return;
      }

      if (!user) {
        return;
      }

      if (user.authority !== "ROLE_ADMIN") {
        router.replace("/access-denied");
        return;
      }

      setIsChecking(false);
    };

    checkAuth();
  }, [token, user, router]);

  if (isChecking || !token || !user || user.authority !== "ROLE_ADMIN") {
    return null;
  }

  return children;
}
