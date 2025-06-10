"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function PaymentFailedPage() {
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason");

  return (
    <div className="justify-center items-center flex flex-col h-screen px-4 text-center">
      <h1 className="text-2xl font-bold text-red-600">Payment Failed</h1>
      <p className="text-lg mt-2">
        {reason
          ? decodeURIComponent(reason)
          : "Your payment was not successful. One or more products are out of stock."}
      </p>
      <Link href="/" className="mt-4 text-blue-500 hover:underline">
        Continue Shopping
      </Link>
    </div>
  );
}
