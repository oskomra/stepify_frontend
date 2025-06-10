"use client";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

export default function useFetchCart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const finalPrice = useSelector((state) => state.cart.finalPrice);
  const discountTotal = useSelector((state) => state.cart.discountTotal);
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
          dispatch({ type: "cart/setTotalPrice", payload: data.totalPrice });
          dispatch({
            type: "cart/setFinalPrice",
            payload: data.finalPrice || data.totalPrice,
          });
          dispatch({
            type: "cart/setDiscountTotal",
            payload: data.discountTotal || 0,
          });
          dispatch({
            type: "cart/setCartQuantity",
            payload: data.cartItems.reduce(
              (total, item) => total + item.quantity,
              0
            ),
          });
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchCart();
  }, [dispatch]);

  const refreshCart = async () => {
    try {
      setLoading(true);
      await updateCartData(dispatch);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    cartItems,
    totalPrice,
    finalPrice,
    discountTotal,
    quantity,
    error,
    loading,
    refreshCart,
  };
}
