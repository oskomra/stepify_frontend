"use client";
import ProductColors from "./product-colors";
import ProductSizes from "./product-sizes";
import ProductInfo from "./product-info";
import { Button } from "../../../components/ui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useState } from "react";
import { useDispatch } from "react-redux";
import CartModal from "../../cart/cart-modal";
import { useAuth } from "@/provider/AuthProvider";
import { useRouter } from "next/navigation";

const productSchema = Yup.object({
  color: Yup.string().required("Color is required"),
  size: Yup.string().required("Size is required"),
});

export default function ProductDetails({ product }) {
  const { brandName, modelName, colors } = product;
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(0);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { token } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(productSchema),
  });

  async function onSubmit(data) {
    if (!token) {
      router.push("/login");
      return;
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cart/${brandName}/${modelName}`,
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
        dispatch({
          type: "cart/addCartItem",
          payload: {
            ...data,
            brandName,
            modelName,
            price: selectedColor.price,
            image: selectedColor.images[0],
            colorName: selectedColor.colorName,
            quantity: 1,
          },
        });
        setOpen(true);
      } else if (response.status === 409) {
        const errorData = await response.json();
        setError("root.serverError", {
          type: "manual",
          message: errorData.message || "Product is out of stock",
        });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  }

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto gap-4 lg:gap-5">
      <div className="flex flex-col lg:flex-row w-full gap-4 lg:gap-5">
        <div className="w-full lg:basis-3/5 bg-neutral-100 min-h-[250px] md:min-h-[320px] lg:min-h-[400px] rounded-md">
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}${selectedColor.images[0]}`}
            alt={`${brandName} ${modelName}`}
            className="w-full h-full object-contain p-2"
          />
        </div>
        <div className="w-full lg:basis-2/5 border border-neutral-200 bg-white rounded-md shadow-md">
          <div className="p-3 md:p-4">
            <ProductInfo product={product} selectedColor={selectedColor} />
            <form onSubmit={handleSubmit(onSubmit)} className="pt-4 md:pt-5">
              <ProductColors
                product={product}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
                register={register}
                errors={errors}
                setValue={setValue}
              />
              <ProductSizes
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
                selectedColor={selectedColor}
                register={register}
                errors={errors}
                setValue={setValue}
              />
              <div className="flex items-center justify-center pt-2 md:pt-4">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Adding..." : "Add to cart"}
                </Button>
              </div>
              {errors.root?.serverError && (
                <p className="text-red-500 text-sm text-center mb-2">
                  {errors.root.serverError.message}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
      <div className="w-full border border-neutral-200 bg-white rounded-md shadow-md p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">
          Details
        </h2>
        <div className="prose prose-sm md:prose max-w-none">
          {product.description ? (
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          ) : (
            <p>No description available for this product.</p>
          )}
        </div>
      </div>
      <CartModal
        product={product}
        open={open}
        setOpen={setOpen}
        selectedColor={selectedColor}
        selectedSize={selectedSize}
      />
    </div>
  );
}
