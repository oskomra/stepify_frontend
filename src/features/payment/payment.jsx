"use client";
import useFetchPayment from "@/hooks/useFetchPayment";
import PaymentCreditCard from "./payment-credit-card";
import PaymentBlik from "./payment-blik";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Payment({ order }) {
  const router = useRouter();
  const { id } = order;
  const payment = useFetchPayment(id);

  useEffect(() => {
    if (payment && payment.paymentStatus === "COMPLETED") {
      router.push("/payment/completed");
    } else if (payment && payment.paymentStatus === "FAILED") {
      router.push("/payment/failed");
    }
  }, [payment, router]);

  if (!payment || payment.paymentStatus === "COMPLETED") {
    return null;
  }

  return (
    <div className="flex flex-col lg:w-1/3 md:w-1/3 sm:w-full w-full gap-4 p-4">
      {payment.paymentMethod === "CREDIT_CARD" ? (
        <PaymentCreditCard payment={payment} />
      ) : null}
      {payment.paymentMethod === "BLIK" ? (
        <div className="text-center text-lg font-semibold">
          <PaymentBlik payment={payment} />
        </div>
      ) : null}
    </div>
  );
}
