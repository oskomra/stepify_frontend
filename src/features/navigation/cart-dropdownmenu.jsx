"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faS } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import OrderItem from "@/features/order/order-items";
import useFetchCart from "@/hooks/useFetchCart";

export default function CartDropdownMenu() {
  const { cartItems, quantity } = useFetchCart();

  return (
    <div className="flex justify-between">
      <div className="flex space-x-4">
        <div className="group relative">
          <Button variant="primary" className="inline-flex items-center gap-2">
            <FontAwesomeIcon
              icon={faCartShopping}
              className="text-neutral-300 w-4 h-4"
            />
          </Button>
          <div className="absolute right-0 lg:left-0 z-10 hidden w-72 rounded-md border text-neutral-300 border-neutral-700 bg-neutral-800 p-1 shadow-md animate-in fade-in-80 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 group-hover:block">
            <div className="py-2 pl-2">Cart({quantity})</div>

            <div className="mx-1 my-1 h-px bg-neutral-700"></div>

            <div className="max-h-[300px] overflow-y-auto pr-1 space-y-2 text-sm">
              {cartItems && cartItems.length > 0 ? (
                <OrderItem orderItems={cartItems} compact={true} />
              ) : (
                <p className="text-sm text-neutral-400 py-2 pl-2">
                  Your cart is empty
                </p>
              )}
            </div>

            <div className="mx-1 mt-3 h-px bg-neutral-700"></div>
            <Link
              href="/cart"
              className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-neutral-700 hover:text-neutral-50 focus:bg-neutral-700 justify-center font-medium"
              prefetch={false}
            >
              View cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
