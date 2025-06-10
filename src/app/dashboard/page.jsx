"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import useFetchOrders from "@/hooks/useFetchOrders";
import useFetchProducts from "@/hooks/useFetchProducts";

export default function DashboardOverview() {
  const { orders } = useFetchOrders();
  const { products } = useFetchProducts();
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    averageOrderValue: 0,
    totalProducts: 0,
    lowStockProducts: 0,
    recentOrders: [],
  });

  useEffect(() => {
    if (orders && products) {
      const totalRevenue = orders.reduce(
        (sum, order) => sum + order.totalPrice,
        0
      );
      const totalOrders = orders.length;
      const averageOrderValue =
        totalOrders > 0 ? totalRevenue / totalOrders : 0;
      const totalProducts = products.length;

      const lowStockProducts = products.reduce((count, product) => {
        const hasLowStock = product.colors.some((color) =>
          color.sizes.some((size) => size.stock < 10)
        );
        return hasLowStock ? count + 1 : count;
      }, 0);

      const recentOrders = [...orders]
        .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
        .slice(0, 5);

      setStats({
        totalRevenue,
        totalOrders,
        averageOrderValue,
        totalProducts,
        lowStockProducts,
        recentOrders,
      });
    }
  }, [orders, products]);

  const statCards = [
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue.toFixed(2)}`,
      icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
      description: "Total revenue from all orders",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: <ShoppingCart className="h-4 w-4 text-muted-foreground" />,
      description: "Number of orders received",
    },
    {
      title: "Average Order Value",
      value: `$${stats.averageOrderValue.toFixed(2)}`,
      icon: <TrendingUp className="h-4 w-4 text-muted-foreground" />,
      description: "Average value per order",
    },
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: <Package className="h-4 w-4 text-muted-foreground" />,
      description: "Products in catalog",
    },
    {
      title: "Low Stock Products",
      value: stats.lowStockProducts,
      icon: <Package className="h-4 w-4 text-red-500" />,
      description: "Products with stock < 10",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {statCards.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between border-b pb-2"
              >
                <div>
                  <p className="font-medium">Order #{order.id}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${order.totalPrice.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">
                    {order.orderItems.reduce(
                      (sum, item) => sum + item.quantity,
                      0
                    )}{" "}
                    items
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
