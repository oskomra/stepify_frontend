"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";
import { useAuth } from "@/provider/AuthProvider";
import useFetchCart from "@/hooks/useFetchCart";

const loginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
});

export function LoginForm({ className, ...props }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  async function onSubmit(data) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const data = await response.json();
        login(data.token, data.user);
        dispatch({ type: "user/setUserEmail", payload: data.user.email });
        dispatch({ type: "user/setUserName", payload: data.user.name });
        dispatch({ type: "user/setUserLastName", payload: data.user.lastName });
        dispatch({ type: "user/setUserPhone", payload: data.user.phone });
        dispatch({
          type: "user/setUserAuthority",
          payload: data.user.authority,
        });

        try {
          const cartResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/cart`,
            {
              method: "GET",
              credentials: "include",
              headers: {
                Authorization: `Bearer ${data.token}`,
              },
            }
          );

          if (cartResponse.ok) {
            const cartData = await cartResponse.json();
            dispatch({
              type: "cart/setCartItems",
              payload: cartData.cartItems,
            });
          }
        } catch (err) {
          console.error("Failed to fetch cart after login:", err);
        }

        router.push("/");
      } else {
        if (response.status === 401) {
          setError("root.serverError", {
            type: "manual",
            message: "Invalid email or password",
          });
        }
      }
    } catch (error) {
      setError("root.serverError", {
        type: "manual",
        message: "An error occurred. Please try again.",
      });
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="m@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </Button>
                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
              </div>
            </div>
            {errors.root?.serverError && (
              <p className="mt-4 text-sm text-red-500 text-center">
                {errors.root.serverError.message}
              </p>
            )}
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="register" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
