"use client";
import ShippingDetails from "@/features/order/shipping-details";
import { useAuth } from "@/provider/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function OrderPage() {
  const { token } = useAuth();
  const router = useRouter();
  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    if (!token) {
      router.replace("/login");
    }
    if (cartItems.length === 0) {
      router.replace("/cart");
    }
  }, [token, router, cartItems]);

  if (!token) return null;

  return <ShippingDetails />;
}
