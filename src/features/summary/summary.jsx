"use client";
import useFetchOrder from "@/hooks/useFetchOrder";
import useFetchCart from "@/hooks/useFetchCart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import SummaryCard from "../order/summary-card";
import OrderItem from "../order/order-items";
import AddressCard from "../address/address-card";
import useFetchAddresses from "@/hooks/useFetchAddresses";
import UserCard from "../user/user-card";
import ModifyButton from "@/components/ui/modify-button";
import DeliveryCard from "../order/delivery-card";

export default function Summary() {
  const router = useRouter();
  const { orderItems, totalPrice } = useFetchOrder();
  const { selectedAddress } = useFetchAddresses();
  const deliveryPrice = useSelector((state) => state.orders.deliveryPrice);
  const { totalPrice: productsPrice } = useFetchCart();

  function handleProceedOnClick() {
    router.push("/payment");
  }

  function handleModifyOnClick() {
    router.push("/order");
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 px-4 md:px-12 lg:px-32 xl:px-96 py-25 items-start justify-center w-full">
      <div className="flex flex-col gap-8 w-full lg:w-2/3 pt-5">
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex flex-row items-center justify-between text-xl font-bold">
                Delivery Method
                <ModifyButton handleModifyOnClick={handleModifyOnClick} />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DeliveryCard />
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex flex-row items-center justify-between text-xl font-bold">
                Buyer details
                <ModifyButton handleModifyOnClick={handleModifyOnClick} />
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pl-6">
              <UserCard />
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex flex-row items-center justify-between text-xl font-bold">
                Shipping Details
                <ModifyButton handleModifyOnClick={handleModifyOnClick} />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AddressCard address={selectedAddress} />
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">Products</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <OrderItem orderItems={orderItems} />
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="w-full lg:w-1/3">
        <Card>
          <CardContent className="p-4">
            <SummaryCard
              productsPrice={productsPrice}
              deliveryPrice={deliveryPrice}
              totalPrice={totalPrice}
              handleOnClick={handleProceedOnClick}
              submitText="Proceed to Payment"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
