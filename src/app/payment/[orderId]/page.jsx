import { cookies } from "next/headers";
import Payment from "@/features/payment/payment";
import { notFound } from "next/navigation";

export default async function PaymentPage({ params }) {
  const { orderId } = params;

  const cookieStore = cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/order/${orderId}`,
    {
      headers: {
        Cookie: cookieHeader,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  if (response.status === 404) {
    notFound();
  }

  if (response.status === 401) {
    return (
      <div className="text-red-500">Unauthorized access. Please log in.</div>
    );
  }

  const order = await response.json();

  if (!order) {
    return <div className="text-red-500">Order data not found.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center py-25">
      <Payment order={order} />
    </div>
  );
}
