"use client";
import CartSummary from "@/features/cart/cart-summary";
import CartItem from "@/features/cart/cart-item";
import { useAuth } from "@/provider/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CartPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) return null;

  return (
    <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 py-8 items-start justify-center w-full max-w-screen-2xl mx-auto">
      <div className="flex flex-col gap-4 w-full lg:w-2/3 pt-4">
        <CartItem />
      </div>
      <div className="w-full lg:w-1/3">
        <CartSummary />
      </div>
    </div>
  );
}
