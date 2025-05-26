"use client";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

export default function useFetchCart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const quantity = useSelector((state) => state.cart.quantity);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCart() {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8080/cart", {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          dispatch({ type: "cart/setCartItems", payload: data.cartItems });
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchCart();
  }, [dispatch]);

  return { cartItems, totalPrice, quantity, error, loading };
}
