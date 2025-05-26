"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function CartSummary() {
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const quantity = useSelector((state) => state.cart.quantity);
  const router = useRouter();

  function handleCheckout() {
    router.push("/order");
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Cart Summary</CardTitle>
          <CardDescription>Review your items before checkout</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-row justify-between">
              <div className="text-lg font-semibold">Items:</div>
              <div className="text-lg">{quantity}</div>
            </div>
            <div className="flex flex-row justify-between">
              <div className="text-lg font-semibold">Total:</div>
              <div className="text-lg font-semibold">
                ${totalPrice.toFixed(2)}
              </div>
            </div>
            <Button
              onClick={handleCheckout}
              className="mt-4 w-full"
              disabled={cartItems.length === 0}
            >
              Proceed to Shipping
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
