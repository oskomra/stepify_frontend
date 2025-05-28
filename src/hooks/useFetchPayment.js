"use client";

import { useState, useEffect } from "react";

export default function useFetchPayment(id) {
  const [payment, setPayment] = useState(null);

  useEffect(() => {
    const fetchPayment = async () => {
      const response = await fetch(`http://localhost:8080/payment/${id}`);
      const data = await response.json();
      setPayment(data);
    };

    fetchPayment();
  }, []);

  return payment;
}
