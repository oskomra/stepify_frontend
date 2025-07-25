"use client";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Card, CardContent } from "@/components/ui/card";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  removeCartItem,
  setCartItems,
  updateCartItemQuantity,
} from "@/store/slices/cartSlice";
import useFetchCart from "@/hooks/useFetchCart";
import useFetchProducts from "@/hooks/useFetchProducts";
import Link from "next/link";
import { updateCartData } from "@/utils/updateCartData";

export default function CartItem() {
  const { cartItems } = useFetchCart();
  const { products, loading: productsLoading } = useFetchProducts();
  const dispatch = useDispatch();

  useEffect(() => {
    updateCartData(dispatch);
  }, [dispatch]);

  const handleStockValidation = (itemId, color, size, quantity) => {
    const cartItem = cartItems.find((item) => item.id === itemId);
    if (!cartItem) return false;

    const product = products.find((p) => p.id === cartItem.productId);
    if (!product) return false;

    const productColor = product.colors.find(
      (c) => c.color.toLowerCase() === color.toLowerCase()
    );
    if (!productColor) return false;

    const sizeObj = productColor.sizes.find(
      (s) => parseFloat(s.size) === parseFloat(size)
    );
    if (!sizeObj) return false;

    return quantity > sizeObj.stock;
  };

  const handleRemoveItem = async (itemId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cart/${itemId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (response.ok) {
        dispatch(removeCartItem(itemId));
        await updateCartData(dispatch);
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cart/${itemId}?quantity=${newQuantity}`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );
      if (response.ok) {
        dispatch(updateCartItemQuantity({ itemId, quantity: newQuantity }));
        await updateCartData(dispatch);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  return (
    <div className="space-y-4">
      {cartItems.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Your cart is empty</p>
          <Link href="/products" className=" text-blue-500 hover:underline">
            Browse products
          </Link>
        </div>
      ) : (
        cartItems.map((item) => (
          <Card key={item.id || `${item.modelName}-${item.color}-${item.size}`}>
            <CardContent>
              <div className="flex flex-row items-center w-full gap-5">
                <div>
                  <img
                    src={`${
                      process.env.NEXT_PUBLIC_API_URL
                    }/images/${item.modelName.split(" ").join("_")}_${
                      item.color
                    }.webp`}
                    alt={`${item.brandName} ${item.modelName}`}
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain rounded bg-white"
                  />
                </div>
                <div>
                  {item.brandName} {item.modelName}
                  <div className="text-sm text-gray-500">
                    {item.color} | {item.size}
                  </div>
                </div>
                <div className="ml-auto flex items-center gap-4">
                  <div className="text-lg font-semibold">
                    Price: ${item.price}
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="mr-1"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                    >
                      -
                    </Button>
                    <span className="text-lg font-semibold">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      className="ml-1"
                      size="sm"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                      disabled={
                        productsLoading ||
                        handleStockValidation(
                          item.id,
                          item.color,
                          item.size,
                          item.quantity + 1
                        )
                      }
                    >
                      +
                    </Button>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
