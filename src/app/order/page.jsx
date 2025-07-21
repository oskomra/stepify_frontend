"use client";
import ShippingDetails from "@/features/order/shipping-details";
import { useAuth } from "@/provider/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function OrderPage() {
  const { user } = useAuth();
  const router = useRouter();
  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
    if (cartItems.length === 0) {
      router.replace("/cart");
    }
  }, [user, router, cartItems]);

  if (!user) return null;

  return <ShippingDetails />;
}
