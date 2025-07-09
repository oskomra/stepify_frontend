"use client";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

export default function useFetchProducts() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/products`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        dispatch({ type: "products/setProducts", payload: data });
        dispatch({ type: "products/setFilteredProducts", payload: data });
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [dispatch]);

  return { products, error, loading };
}
