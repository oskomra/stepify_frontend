import { cookies } from "next/headers";
import Payment from "@/features/payment/payment";
import { notFound } from "next/navigation";
export default async function PaymentPage({ params }) {
  const { orderId } = await params;

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const response = await fetch(`http://localhost:8080/order/${orderId}`, {
    headers: {
      Cookie: cookieHeader,
      "Content-Type": "application/json",
    },
  });

  if (response.status === 404) {
    notFound();
  }

  if (response.status === 401) {
    return (
      <div className="text-red-500">Unauthorized access. Please log in.</div>
    );
  }

  const text = await response.text();
  let order = null;
  if (text) {
    order = JSON.parse(text);
  } else {
    return <div className="text-red-500">Order data not found.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center py-25">
      <Payment order={order} />
    </div>
  );
}
