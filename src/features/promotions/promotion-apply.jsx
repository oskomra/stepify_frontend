"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { updateCartData } from "@/utils/updateCartData";

const validationSchema = Yup.object().shape({
  code: Yup.string().required("Promotion code is required"),
});

export default function PromotionApply() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  async function onSubmit(data) {
    try {
      const response = await fetch("http://localhost:8080/promotions/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ code: data.code }),
      });
      if (response.ok) {
        await updateCartData(dispatch);
        reset();
      }
    } catch (error) {
      console.error("Error applying promotion:", error);
      return;
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Apply Promotion</CardTitle>
        <CardDescription>Enter your promotion code below</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            placeholder="Enter promotion code"
            className="w-full mb-2"
            {...register("code")}
          />
          <Button className="w-full">Apply</Button>
        </form>
      </CardContent>
    </Card>
  );
}
