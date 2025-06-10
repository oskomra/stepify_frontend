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

export const creditCardPaymentSchema = Yup.object({
  cardNumber: Yup.string()
    .matches(/^\d{16}$/, "Card number must be 16 digits")
    .required("Card number is required"),

  expiryDate: Yup.string()
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry date must be in MM/YY format")
    .required("Expiry date is required"),

  cvv: Yup.string()
    .matches(/^\d{3}$/, "CVV must be 3 digits")
    .required("CVV is required"),
});

export default function PaymentCreditCard({ payment }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(creditCardPaymentSchema),
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
          `/payment-failed?reason=${encodeURIComponent(errorData.message)}`
        );
      }

      dispatch({ type: "cart/clearCart" });
      router.push("/payment/completed");
    } catch (error) {
      console.error("Payment error:", error);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment</CardTitle>
        <CardDescription>
          Please enter your credit card details to complete the order.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                type="text"
                placeholder="1234 5678 9012 3456"
                {...register("cardNumber")}
              />
              {errors.cardNumber && (
                <p className="text-sm text-red-500">
                  {errors.cardNumber.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                type="text"
                placeholder="MM/YY"
                {...register("expiryDate")}
              />
              {errors.expiryDate && (
                <p className="text-sm text-red-500">
                  {errors.expiryDate.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                type="text"
                placeholder="123"
                {...register("cvv")}
              />
              {errors.cvv && (
                <p className="text-sm text-red-500">{errors.cvv.message}</p>
              )}
            </div>
            <div>
              <Button type="submit" className="w-full">
                Pay
              </Button>
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
