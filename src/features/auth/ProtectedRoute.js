"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/provider/AuthProvider";

export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace("/login");
      } else {
        setIsAuthorized(true);
      }
    }
  }, [user, loading, router]);

  if (loading || !isAuthorized) {
    return null;
  }

  return children;
}

"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/provider/AuthProvider";


export function AdminRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace("/login");
        return;
      }

      if (user.authority !== "ROLE_ADMIN") {
        router.replace("/access-denied");
        return;
      }

      setIsChecking(false);
    }
  }, [user, loading, router]);

  if (loading || isChecking) {
    return null;
  }

  return children;
}
Why?