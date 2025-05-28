"use client";
import { useSelector } from "react-redux";

export default function DeliveryCard() {
  const deliveryMethod = useSelector((state) => state.orders.deliveryMethod);
  const deliveryCompany = useSelector((state) => state.orders.deliveryCompany);
  const parcelLockerId = useSelector((state) => state.orders.parcelLockerId);

  return (
    <div>
      <h3 className="text-lg font-semibold">
        {deliveryMethod} {deliveryCompany}
      </h3>
      <div className="mt-2">
        {parcelLockerId !== "" ? `Parcel Locker ID: ${parcelLockerId}` : ""}
      </div>
    </div>
  );
}
