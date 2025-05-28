"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import useFetchPayment from "@/hooks/useFetchPayment";

export default function Payment({ order }) {
  const { orderId } = order;
  const payment = useFetchPayment(orderId);
  if (!payment) {
    return <div className="text-red-500">Loading payment details...</div>;
  }

  return (
    <div>
      {payment.paymentMethod === "CREDIT_CARD" ? (
        <Card>
          <CardHeader>
            <CardTitle>Payment</CardTitle>
            <CardDescription>
              Please enter your payment details to complete the order.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              type="text"
              placeholder="1234 5678 9012 3456"
            />
            <Label htmlFor="expiryDate">Expiry Date</Label>
            <Input id="expiryDate" type="text" placeholder="MM/YY" />
            <Label htmlFor="cvv">CVV</Label>
            <Input id="cvv" type="text" placeholder="123" />
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
