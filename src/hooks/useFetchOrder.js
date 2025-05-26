"use client";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

export default function useFetchOrder() {
  const dispatch = useDispatch();
  const orderItems = useSelector((state) => state.orders.orderItems);
  const totalPrice = useSelector((state) => state.orders.totalPrice);
  const availableAddresses = useSelector(
    (state) => state.orders.availableAddresses
  );
  const date = useSelector((state) => state.orders.date);
  const status = useSelector((state) => state.orders.status);
  const deliveryMethod = useSelector((state) => state.orders.deliveryMethod);
  const paymentMethod = useSelector((state) => state.orders.paymentMethod);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8080/order", {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          dispatch({ type: "orders/setOrderItems", payload: data.orderItems });
          dispatch({
            type: "orders/setShippingAddress",
            payload: data.shippingAddress,
          });
          dispatch({
            type: "orders/setTotalPrice",
            payload: data.totalPrice + 10,
          });
          dispatch({ type: "orders/setDate", payload: data.orderDate });
          dispatch({ type: "orders/setStatus", payload: data.status });
          dispatch({
            type: "orders/setDeliveryMethod",
            payload: data.deliveryMethod,
          });
          dispatch({
            type: "orders/setDeliveryCompany",
            payload: data.deliveryCompany,
          });
          dispatch({
            type: "orders/setPaymentMethod",
            payload: data.paymentMethod,
          });
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [dispatch]);

  return {
    orderItems,
    totalPrice,
    availableAddresses,
    date,
    status,
    deliveryMethod,
    paymentMethod,
    error,
    loading,
  };
}
