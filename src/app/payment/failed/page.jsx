"use client";

import Link from "next/link";

export default function PaymentFailedPage() {
  return (
    <div className="justify-center items-center flex flex-col h-screen px-4 text-center">
      <h1 className="text-2xl font-bold text-red-600">Payment Failed</h1>
      <Link href="/" className="mt-4 text-blue-500 hover:underline">
        Continue Shopping
      </Link>
    </div>
  );
}
