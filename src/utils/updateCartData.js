import { setCartItems } from "@/store/slices/cartSlice";

export const updateCartData = async (dispatch) => {
  try {
    const response = await fetch("http://localhost:8080/cart", {
      credentials: "include",
    });
    if (response.ok) {
      const cartData = await response.json();
      dispatch(setCartItems(cartData.cartItems));
      dispatch({
        type: "cart/setTotalPrice",
        payload: cartData.totalPrice,
      });
      dispatch({
        type: "cart/setDiscountTotal",
        payload: cartData.discountTotal || 0,
      });
      dispatch({
        type: "cart/setFinalPrice",
        payload: cartData.finalPrice || cartData.totalPrice,
      });
    }
  } catch (error) {
    console.error("Error fetching updated cart data:", error);
  }
};
