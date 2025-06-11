"use client";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

export default function useFetchFilteredProducts() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.products.filters);
  const filteredProducts = useSelector(
    (state) => state.products.filteredProducts
  );
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFilteredProducts(selectedFilters, query) {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8080/products/filter", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...selectedFilters,
          }),
          credentials: "include",
        });
        const data = await response.json();
        dispatch({ type: "products/setFilteredProducts", payload: data });
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchFilteredProducts(filters);
  }, [filters, dispatch]);

  return { filteredProducts, error, loading };
}
