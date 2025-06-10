"use client";

import { useState, useEffect } from "react";

export default function useFetchPayment(id) {
  const [payment, setPayment] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchPayment = async () => {
      try {
        const response = await fetch(`http://localhost:8080/payment/${id}`, {
          credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch payment");
        const data = await response.json();
        setPayment(data);
      } catch (error) {
        setPayment(null);
      }
    };
    fetchPayment();
  }, [id]);

  return payment;
}
