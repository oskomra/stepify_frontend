import Link from "next/link";

export default function CompletedPage() {
  return (
    <div className="justify-center items-center flex flex-col h-screen">
      <h1 className="text-2xl font-bold">Payment Completed</h1>
      <p className="text-lg">Your payment was successful!</p>
      <Link href="/" className="mt-4 text-blue-500 hover:underline">
        Continue Shopping
      </Link>
    </div>
  );
}
