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
import { useEffect } from "react";
import PaymentCard from "../order/payment-card";

export default function Summary() {
  const router = useRouter();
  const { orderItems, totalPrice } = useFetchOrder();
  const { selectedAddress } = useFetchAddresses();
  const deliveryPrice = useSelector((state) => state.orders.deliveryPrice);
  const deliveryMethod = useSelector((state) => state.orders.deliveryMethod);
  const deliveryCompany = useSelector((state) => state.orders.deliveryCompany);
  const paymentMethod = useSelector((state) => state.orders.paymentMethod);
  const parcelLockerId = useSelector((state) => state.orders.parcelLockerId);
  const { totalPrice: productsPrice } = useFetchCart();

  useEffect(() => {
    if (
      !orderItems ||
      orderItems.length === 0 ||
      !selectedAddress ||
      !deliveryPrice
    ) {
      router.push("/order");
    }
  }, [orderItems, selectedAddress, deliveryPrice, router]);

  async function handleProceedOnClick() {
    const orderData = {
      orderItems,
      totalPrice,
      shippingAddress: selectedAddress,
      deliveryMethod: deliveryMethod.toUpperCase(),
      deliveryCompany,
      parcelLockerId,
      payment: {
        paymentMethod: paymentMethod.toUpperCase(),
      },
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Order saved successfully:", data);
        router.push(`/payment/${data.id}`);
      }
    } catch (error) {
      console.error("Error saving order:", error);
    }
  }

  function handleModifyOnClick() {
    router.push("/order");
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 py-8 items-start justify-center w-full max-w-screen-2xl mx-auto">
      <div className="flex flex-col gap-4 w-full lg:w-2/3 pt-4">
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
                Buyer
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
                Shipping
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
              <CardTitle className="flex flex-row items-center justify-between text-xl font-bold">
                Payment
                <ModifyButton handleModifyOnClick={handleModifyOnClick} />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PaymentCard />
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
