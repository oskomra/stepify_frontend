"use client";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

export default function useFetchPromotions() {
  const dispatch = useDispatch();
  const promotions = useSelector((state) => state.promotions.promotions);

  useEffect(() => {
    async function fetchActivePromotions() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/promotions`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (response.ok) {
          const promotions = await response.json();
          dispatch({
            type: "promotions/setPromotions",
            payload: promotions,
          });
        }
      } catch (error) {
        console.error("Failed to fetch active promotions:", error);
      }
    }

    fetchActivePromotions();
  }, [dispatch]);

  return { promotions };
}
