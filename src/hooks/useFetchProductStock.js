"use client";
import { useState, useEffect } from "react";

export default function useFetchProductStock(productId, color, size) {
  const [stock, setStock] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId || !color || size === undefined) return;

    async function fetchProductStock() {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}/stock?color=${color}&size=${size}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product stock");
        }
        const data = await response.json(); // returns a raw number
        setStock(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProductStock();
  }, [productId, color, size]);

  return { stock, error, loading };
}
