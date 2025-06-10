"use client";
import useFetchOrders from "@/hooks/useFetchOrders";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import OrderItem from "../order/order-items";
import Link from "next/link";

export default function UserOrderCard() {
  const { orders, loading, error } = useFetchOrders();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {orders.map((order) => (
        <Card key={order.id} className="mb-4">
          <CardHeader>
            <CardTitle>Order #{order.id}</CardTitle>
            <CardDescription>
              <div className="flex">
                <div className="flex-1">
                  Status : {order.status} | Total: $
                  {order.totalPrice.toFixed(2)} | Date:{" "}
                  {order.orderDate.split("T")[0]}{" "}
                </div>
                <div className="flex justify-end">
                  {order.status === "AWAITING_PAYMENT" && (
                    <Link
                      href={`/payment/${order.id}`}
                      className=" text-blue-500 hover:underline"
                    >
                      Pay Now
                    </Link>
                  )}
                </div>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <OrderItem orderItems={order.orderItems} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
