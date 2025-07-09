"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddressForm from "./address-form";

const addressSchema = Yup.object({
  street: Yup.string().required("Street is required"),
  city: Yup.string().required("City is required"),
  postalCode: Yup.string().required("Postal code is required"),
  country: Yup.string().required("Country is required"),
});

export default function AddAddress() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(addressSchema),
  });

  async function onSubmit(data) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/addresses`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        const newAddress = await response.json();
        dispatch({ type: "addresses/addAddress", payload: newAddress });
        dispatch({
          type: "addresses/setSelectedAddress",
          payload: newAddress,
        });
        setOpen(false);
        reset();
      }
    } catch (error) {
      console.error("Error adding address:", error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add new address</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new address</DialogTitle>
        </DialogHeader>
        <AddressForm
          onSubmit={onSubmit}
          onCancel={() => setOpen(false)}
          errors={errors}
          register={register}
          handleSubmit={handleSubmit}
          submitText="Add Address"
        />
      </DialogContent>
    </Dialog>
  );
}
