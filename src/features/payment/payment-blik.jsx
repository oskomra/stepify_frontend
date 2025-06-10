"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

export const blikPaymentSchema = Yup.object({
  blikCode: Yup.string()
    .matches(/^\d{6}$/, "Blik code must be 6 digits")
    .required("Blik code is required"),
});

export default function PaymentBlik({ payment }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(blikPaymentSchema),
  });

  async function onSubmit(data) {
    try {
      const response = await fetch(
        `http://localhost:8080/payment/${payment.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(data),
        }
      );

      if (response.status === 409) {
        const errorData = await response.json();
        dispatch({ type: "cart/clearCart" });
        router.push(
          `/payment/failed?reason=${encodeURIComponent(errorData.message)}`
        );
      } else if (response.ok) {
        dispatch({ type: "cart/clearCart" });
        router.push("/payment/completed");
      }
    } catch (error) {
      console.error("Payment error:", error);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Blik Payment</CardTitle>
        <CardDescription>Enter your Blik details</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="blikCode">Blik Code</Label>
              <Input id="blikCode" {...register("blikCode")} />
              {errors.blikCode && (
                <p className="text-sm text-red-500">
                  {errors.blikCode.message}
                </p>
              )}
            </div>
            <div>
              <Button type="submit">Pay</Button>
              {errors.root?.serverError && (
                <p className="mt-4 text-sm text-red-500 text-center">
                  {errors.root.serverError.message}
                </p>
              )}
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
