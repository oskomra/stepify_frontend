"use client";
import React, { useEffect, useState } from "react";
import DataTable from "../../../components/ui/data-table";
import { columns } from "./columns";
import useFetchOrders from "@/hooks/useFetchOrders";
import { useRouter } from "next/navigation";

export default function OrderDashboard() {
  const [data, setData] = useState([]);
  const { orders } = useFetchOrders();
  const router = useRouter();

  useEffect(() => {
    setData(() => {
      return orders.map((order) => {
        return {
          id: order.id,
          userId: order.userId,
          totalPrice: order.totalPrice,
          orderDate: order.orderDate,
          status: order.status,
          deliveryMethod: order.deliveryMethod,
          deliveryCompany: order.deliveryCompany,
          quantity: order.orderItems.reduce(
            (total, item) => total + item.quantity,
            0
          ),
        };
      });
    });
  }, [orders]);

  async function handleOrderCancel(orderId) {
    const response = await fetch(`http://localhost:8080/order/${orderId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (response.status === 404) {
      alert("Order not found");
    }
  }

  async function handleOrderDetails(orderId) {
    const response = await fetch(`http://localhost:8080/order/${orderId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (response.ok) {
      router.push(`/dashboard/orders/${orderId}`);
    } else {
      if (response.status === 404) {
        alert("Order not found");
      }
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl text-center font-bold mb-4">Orders</h1>
      <div className="flex justify-center mb-4"></div>
      <DataTable
        columns={columns(handleOrderCancel, handleOrderDetails)}
        data={data}
        filterColumn="deliveryCompany"
        filterPlaceholder="Search by delivery company"
      />
    </div>
  );
}
