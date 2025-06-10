"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSelector, useDispatch } from "react-redux"; // Add dispatch
import { useRouter } from "next/navigation";
import PromotionApply from "../promotions/promotion-apply";
import { useEffect, useRef } from "react"; // Add this import
import { updateCartData } from "@/utils/updateCartData"; // Add this import

export default function CartSummary() {
  const dispatch = useDispatch(); // Add this
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const discountTotal = useSelector((state) => state.cart.discountTotal);
  const finalPrice = useSelector((state) => state.cart.finalPrice);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const quantity = useSelector((state) => state.cart.quantity);
  const router = useRouter();

  const prevCountRef = useRef(0);

  useEffect(() => {
    const currentCount = cartItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    if (currentCount !== prevCountRef.current && cartItems.length > 0) {
      updateCartData(dispatch);
      prevCountRef.current = currentCount;
    }
  }, [cartItems, dispatch]);

  function handleCheckout() {
    router.push("/order");
  }

  return (
    <div>
      <PromotionApply />
      <Card className="mt-4">
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

            {/* Show subtotal if there's a discount */}
            {discountTotal > 0 && (
              <div className="flex flex-row justify-between">
                <div className="text-lg">Subtotal:</div>
                <div className="text-lg">${totalPrice.toFixed(2)}</div>
              </div>
            )}

            {/* Show discount if there is one */}
            {discountTotal > 0 && (
              <div className="flex flex-row justify-between">
                <div className="text-lg text-green-600">Discount:</div>
                <div className="text-lg text-green-600">
                  -${discountTotal.toFixed(2)}
                </div>
              </div>
            )}

            {/* Final price */}
            <div className="flex flex-row justify-between">
              <div className="text-lg font-semibold">Total:</div>
              <div className="text-lg font-semibold">
                ${isNaN(finalPrice) ? "0.00" : finalPrice.toFixed(2)}
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
