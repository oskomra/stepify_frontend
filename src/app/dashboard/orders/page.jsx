"use client";
import React, { useEffect, useState } from "react";
import DataTable from "../../../components/ui/data-table";
import { columns } from "./columns";
import useFetchAllOrders from "@/hooks/useFetchAllOrders";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

const ORDER_STATUSES = [
  "PENDING",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];

export default function OrderDashboard() {
  const [data, setData] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterDateRange, setFilterDateRange] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const { orders } = useFetchAllOrders();
  const router = useRouter();

  useEffect(() => {
    setData(() => {
      let filteredOrders = orders;

      if (filterStatus && filterStatus !== "all") {
        filteredOrders = filteredOrders.filter(
          (order) => order.status === filterStatus
        );
      }

      if (filterDateRange && filterDateRange !== "all") {
        const now = new Date();
        const daysAgo = new Date(
          now.getTime() - parseInt(filterDateRange) * 24 * 60 * 60 * 1000
        );
        filteredOrders = filteredOrders.filter(
          (order) => new Date(order.orderDate) >= daysAgo
        );
      }

      return filteredOrders.map((order) => ({
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
        items: order.orderItems,
      }));
    });
  }, [orders, filterStatus, filterDateRange]);

  async function handleOrderStatusUpdate(orderId, status) {
    try {
      const response = await fetch(
        `http://localhost:8080/order/${orderId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ status }),
        }
      );

      if (response.ok) {
        // Update local state
        setData((prevData) =>
          prevData.map((order) =>
            order.id === orderId ? { ...order, status } : order
          )
        );
        setIsStatusDialogOpen(false);
        setSelectedOrder(null);
        setNewStatus("");
      } else {
        alert("Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status");
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

  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "warning";
      case "PROCESSING":
        return "info";
      case "SHIPPED":
        return "secondary";
      case "DELIVERED":
        return "success";
      case "CANCELLED":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl text-center font-bold mb-4">Orders</h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1 min-w-[200px]">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {ORDER_STATUSES.map((status) => (
                <SelectItem key={status} value={status}>
                  <Badge variant={getStatusColor(status)}>{status}</Badge>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <Select value={filterDateRange} onValueChange={setFilterDateRange}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <DataTable
        columns={columns((orderId) => {
          setSelectedOrder(data.find((order) => order.id === orderId));
          setIsStatusDialogOpen(true);
        }, handleOrderDetails)}
        data={data}
      />

      <Dialog open={isStatusDialogOpen} onOpenChange={setIsStatusDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Order Status</DialogTitle>
            <DialogDescription>
              Update status for order #{selectedOrder?.id}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select new status" />
                </SelectTrigger>
                <SelectContent>
                  {ORDER_STATUSES.map((status) => (
                    <SelectItem key={status} value={status}>
                      <Badge variant={getStatusColor(status)}>{status}</Badge>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsStatusDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() =>
                handleOrderStatusUpdate(selectedOrder?.id, newStatus)
              }
              disabled={!newStatus || newStatus === selectedOrder?.status}
            >
              Update Status
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
