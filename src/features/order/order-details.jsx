"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import OrderItem from "./order-items";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { useEffect, useState } from "react";

export function OrderStatusIcon({ status, className = "" }) {
  if (status === "CONFIRMED" || status === "COMPLETED") {
    return (
      <CheckCircle
        className={`text-green-500 inline-block mr-1 ${className}`}
        size={18}
      />
    );
  }
  if (status === "CANCELLED") {
    return (
      <XCircle
        className={`text-red-500 inline-block mr-1 ${className}`}
        size={18}
      />
    );
  }
  return (
    <Clock
      className={`text-yellow-500 inline-block mr-1 ${className}`}
      size={18}
    />
  );
}

export function PaymentStatusIcon({ status, className = "" }) {
  if (status === "COMPLETED") {
    return (
      <CheckCircle
        className={`text-green-500 inline-block mr-1 ${className}`}
        size={16}
      />
    );
  }
  if (status === "FAILED" || status === "CANCELLED") {
    return (
      <XCircle
        className={`text-red-500 inline-block mr-1 ${className}`}
        size={16}
      />
    );
  }
  return (
    <Clock
      className={`text-yellow-500 inline-block mr-1 ${className}`}
      size={16}
    />
  );
}

export default function OrderDetails({ orderDetails }) {
  if (!orderDetails) return null;

  const {
    id,
    userId,
    orderItems = [],
    totalPrice,
    shippingAddress,
    orderDate,
    status,
    deliveryMethod,
    deliveryCompany,
    parcelLockerId,
    payment,
  } = orderDetails;

  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const [userError, setUserError] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/user/${userId}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user info");
        }
        const data = await response.json();
        setUser(data);
        setUserLoading(false);
      } catch (error) {
        setUserError(error.message);
        setUserLoading(false);
      }
    }
    fetchUser();
  }, [userId]);

  return (
    <div className="flex flex-col gap-10 w-full max-w-4xl mx-auto py-8">
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <span>
              Order <span className="font-mono text-primary">#{id}</span>
            </span>
            <span className="flex items-center gap-2 text-base font-normal text-muted-foreground">
              {new Date(orderDate).toLocaleString()}
            </span>
          </CardTitle>
          <CardDescription className="flex items-center gap-2 mt-2">
            <OrderStatusIcon status={status} />
            <span className="font-semibold text-lg">{status}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-background/80 rounded-lg p-4 shadow-sm border">
              <h3 className="text-lg font-semibold mb-2">User Details</h3>
              {userLoading ? (
                <div className="text-muted-foreground text-sm">
                  Loading user info...
                </div>
              ) : userError ? (
                <div className="text-red-500 text-sm">{userError}</div>
              ) : user ? (
                <div className="flex flex-col gap-1">
                  <div className="text-base font-medium">
                    {user.name} {user.lastName}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Email: {user.email}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Phone: {user.phone}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    User ID: <span className="font-mono">{user.id}</span>
                  </div>
                </div>
              ) : (
                <div className="text-muted-foreground text-sm">
                  No user info.
                </div>
              )}
            </div>
            <div className="bg-background/80 rounded-lg p-4 shadow-sm border">
              <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
              {shippingAddress && (
                <div className="mt-2 text-sm">
                  <div>{shippingAddress.street}</div>
                  <div>
                    {shippingAddress.postalCode} {shippingAddress.city}
                  </div>
                  <div>{shippingAddress.country}</div>
                </div>
              )}
              <div className="mt-4 text-base font-medium">
                {deliveryMethod} {deliveryCompany}
              </div>
              {parcelLockerId && parcelLockerId !== "" && (
                <div className="text-sm text-muted-foreground mt-1">
                  Parcel Locker ID: {parcelLockerId}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="border-t border-dashed border-muted my-2" />

      {/* Order Items */}
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle>Items</CardTitle>
        </CardHeader>
        <CardContent>
          <OrderItem orderItems={orderItems} />
        </CardContent>
      </Card>

      <div className="border-t border-dashed border-muted my-2" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle>Payment</CardTitle>
          </CardHeader>
          <CardContent>
            {payment ? (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <PaymentStatusIcon status={payment.paymentStatus} />
                  <span className="font-semibold">{payment.paymentStatus}</span>
                </div>
                <div>
                  <span className="font-semibold">Method:</span>{" "}
                  {payment.paymentMethod}
                </div>
                <div>
                  <span className="font-semibold">Amount:</span>{" "}
                  <span className="text-primary font-mono">
                    ${payment.amount}
                  </span>
                </div>
                <div>
                  <span className="font-semibold">Date:</span>{" "}
                  {new Date(payment.paymentDate).toLocaleString()}
                </div>
                <div>
                  <span className="font-semibold">Transaction ID:</span>{" "}
                  <span className="break-all font-mono text-xs">
                    {payment.transactionId}
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-muted-foreground">
                No payment information.
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="bg-primary/10 border-primary border-2 shadow-lg">
          <CardHeader>
            <CardTitle className="text-primary text-xl">Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3 text-lg">
              <div className="flex flex-row justify-between">
                <span>Products:</span>
                <span className="font-mono">
                  ${payment ? payment.amount : totalPrice}
                </span>
              </div>
              <div className="flex flex-row justify-between">
                <span>Shipping:</span>
                <span className="font-mono">
                  ${totalPrice - (payment ? payment.amount : totalPrice)}
                </span>
              </div>
              <div className="flex flex-row justify-between border-t pt-3 mt-3 font-bold text-2xl">
                <span>Total:</span>
                <span className="font-mono text-primary">${totalPrice}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
