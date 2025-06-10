import OrderDetails from "@/features/order/order-details";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";

export default async function OrderDetailsPage({ params }) {
  const { orderId } = await params;
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const response = await fetch(`http://localhost:8080/order/${orderId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
    },
    credentials: "include",
  });

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error("Failed to fetch order details");
  }

  const orderDetails = await response.json();

  return (
    <div className="flex flex-row px-75 py-25">
      <OrderDetails orderDetails={orderDetails} />
    </div>
  );
}
