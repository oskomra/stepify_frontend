"use client";
import useFetchOrder from "@/hooks/useFetchOrder";
import useFetchCart from "@/hooks/useFetchCart";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import SummaryCard from "./summary-card";
import OrderItem from "./order-items";

export default function OrderSummary({ handleSubmitOnClick }) {
  const { orderItems, totalPrice } = useFetchOrder();
  const deliveryPrice = useSelector((state) => state.orders.deliveryPrice);
  const { totalPrice: productsPrice } = useFetchCart();

  return (
    <div>
      <Card>
        <CardContent>
          <div className="space-y-4">
            <OrderItem orderItems={orderItems} />
            <SummaryCard
              productsPrice={productsPrice}
              deliveryPrice={deliveryPrice}
              totalPrice={totalPrice}
              handleOnClick={handleSubmitOnClick}
              submitText="Proceed to summary"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
