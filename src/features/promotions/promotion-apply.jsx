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
    setError,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  async function onSubmit(data) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/promotions/apply`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ code: data.code }),
        }
      );
      if (response.ok) {
        await updateCartData(dispatch);
        reset();
      } else if (response.status === 422) {
        const errorData = await response.json();
        setError("root.serverError", {
          type: "manual",
          message: errorData.message || "Invalid promotion code",
        });
      } else if (response.status === 404) {
        setError("root.serverError", {
          type: "manual",
          message: "Promotion code not found",
        });
      }
    } catch (error) {
      setError("root.serverError", {
        type: "manual",
        message: "An error occurred. Please try again.",
      });
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
          <Button variant="outline" className="w-full">
            Apply
          </Button>
          {errors.root?.serverError && (
            <p className="mt-4 text-sm text-red-500 text-center">
              {errors.root.serverError.message}
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
