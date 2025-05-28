"use client";
import { useSelector } from "react-redux";

export default function PaymentCard() {
  const paymentMethod = useSelector((state) => state.orders.paymentMethod);

  return (
    <div>
      <h3 className="text-lg font-semibold">{paymentMethod}</h3>
    </div>
  );
}
