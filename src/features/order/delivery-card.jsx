"use client";
import { useSelector } from "react-redux";

export default function DeliveryCard() {
  const deliveryMethod = useSelector((state) => state.orders.deliveryMethod);
  const deliveryCompany = useSelector((state) => state.orders.deliveryCompany);

  return (
    <div>
      <h3 className="text-lg font-semibold">
        {deliveryMethod} {deliveryCompany}
      </h3>
    </div>
  );
}
