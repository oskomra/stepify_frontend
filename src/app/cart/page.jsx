import CartSummary from "@/features/cart/cart-summary";
import CartItem from "@/features/cart/cart-item";

export default function CartPage() {
  return (
    <div className="flex flex-col lg:flex-row gap-8 px-4 md:px-12 lg:px-32 xl:px-96 py-25 items-start justify-center w-full">
      <div className="w-full lg:w-2/3 pt-5">
        <CartItem />
      </div>
      <div className="w-full lg:w-1/3">
        <CartSummary />
      </div>
    </div>
  );
}
