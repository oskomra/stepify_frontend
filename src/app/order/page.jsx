import OrderSummary from "@/features/order/order-summary";
import ShippingDetails from "@/features/order/shipping-details";

export default function OrderPage() {
  return (
    <div className="flex flex-col lg:flex-row gap-8 px-4 md:px-12 lg:px-32 xl:px-32 py-25 items-start justify-center w-full">
      <div className="w-full lg:w-2/3 pt-5">
        <ShippingDetails />
      </div>
      <div className="w-full lg:w-1/3">
        <OrderSummary />
      </div>
    </div>
  );
}
