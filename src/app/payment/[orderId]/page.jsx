import { cookies } from "next/headers";
import Payment from "@/features/payment/payment";
import { notFound } from "next/navigation";
export default async function PaymentPage({ params }) {
  const { orderId } = params;

  const cookieHeader = cookies().toString();

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
    <div>
      <Payment order={order} />
    </div>
  );
}
