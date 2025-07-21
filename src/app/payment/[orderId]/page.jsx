"use client";

import { useEffect, useState } from "react";
import Payment from "@/features/payment/payment";

export default function PaymentPage({ params }) {
  const { orderId } = params;
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadOrder() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/order/${orderId}`,
          {
            credentials: "include", // cookies sent automatically
          }
        );

        if (!response.ok) {
          const text = await response.text();
          console.error("API error response (not JSON):", text);

          if (response.status === 404) {
            setError("Order not found.");
            return;
          }

          if (response.status === 401) {
            setError("Unauthorized access. Please log in.");
            return;
          }

          throw new Error(`Failed to fetch order: ${response.status}`);
        }

        const orderData = await response.json();
        setOrder(orderData);
      } catch (err) {
        console.error("PaymentPage error:", err);
        setError("Something went wrong loading the order.");
      }
    }

    loadOrder();
  }, [orderId]);

  if (error) return <div className="text-red-500">{error}</div>;
  if (!order) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center py-25">
      <Payment order={order} />
    </div>
  );
}
