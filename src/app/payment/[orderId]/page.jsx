import { cookies } from "next/headers";
import Payment from "@/features/payment/payment";
import { notFound } from "next/navigation";

export default async function PaymentPage({ params }) {
  try {
    const { orderId } = await params;

    const cookieStore = cookies();
    const tokenCookie = cookieStore.get("token"); // the one your backend expects

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/order/${orderId}`,
      {
        headers: {
          ...(tokenCookie ? { Cookie: `token=${tokenCookie.value}` } : {}),
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const text = await response.text();
      console.error("API error response (not JSON):", text);

      if (response.status === 404) notFound();

      if (response.status === 401) {
        return (
          <div className="text-red-500">
            Unauthorized access. Please log in.
          </div>
        );
      }

      throw new Error(
        `Failed to fetch order: ${response.status} ${response.statusText}`
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
  } catch (error) {
    console.error("PaymentPage error:", error);
    return (
      <div className="text-red-500">
        Something went wrong loading the order.
      </div>
    );
  }
}
