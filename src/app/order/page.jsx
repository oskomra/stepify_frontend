"use client";
import ShippingDetails from "@/features/order/shipping-details";
import { useAuth } from "@/provider/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function OrderPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
    if (cartItems.length === 0) {
      router.replace("/cart");
    }
  }, [user, loading, router, cartItems]);

  if (loading || !user) return null;

  return <ShippingDetails />;
}
