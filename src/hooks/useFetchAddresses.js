"use client";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

export default function useFetchAddresses() {
  const dispatch = useDispatch();
  const addresses = useSelector((state) => state.addresses.addresses);
  const selectedAddress = useSelector(
    (state) => state.addresses.selectedAddress
  );
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAddresses() {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8080/addresses", {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          dispatch({ type: "addresses/setAddresses", payload: data });
          if (selectedAddress === null) {
            dispatch({
              type: "addresses/setSelectedAddress",
              payload: data[0] || null,
            });
          }
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchAddresses();
  }, [dispatch]);

  return {
    addresses,
    selectedAddress,
    error,
    loading,
  };
}
