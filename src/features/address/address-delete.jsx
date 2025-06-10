"use client";
import { useDispatch, useSelector } from "react-redux";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components/ui/button";

export default function DeleteAddress({ addressId }) {
  const dispatch = useDispatch();
  const addresses = useSelector((state) => state.addresses.addresses);

  async function handleDeleteAddress(event) {
    event.stopPropagation();
    try {
      const response = await fetch(
        `http://localhost:8080/addresses/${addressId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (response.ok) {
        dispatch({ type: "addresses/removeAddress", payload: addressId });

        const updatedAddresses = addresses.filter(
          (addr) => addr.id !== addressId
        );

        if (updatedAddresses.length > 0) {
          dispatch({
            type: "addresses/setSelectedAddress",
            payload: updatedAddresses[0],
          });
        } else {
          dispatch({
            type: "addresses/setSelectedAddress",
            payload: null,
          });
        }
      }
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  }

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Button
        type="button"
        variant="destructive"
        onClick={handleDeleteAddress}
        className="bg-red-500 text-white hover:bg-red-400"
      >
        <FontAwesomeIcon icon={faTrash} className="" />
      </Button>
    </div>
  );
}
