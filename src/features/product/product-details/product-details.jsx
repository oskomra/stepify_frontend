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

const productSchema = Yup.object({
  color: Yup.string().required("Color is required"),
  size: Yup.string().required("Size is required"),
});

export default function ProductDetails({ product }) {
  const { brandName, modelName, colors } = product;
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(null);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(productSchema),
  });

  async function onSubmit(data) {
    try {
      const response = await fetch(
        `http://localhost:8080/cart/${brandName}/${modelName}`,
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
        dispatch({ type: "cart/addCartItem", payload: data });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  }

  return (
    <div className="flex flex-row w-full h-160 gap-5">
      <div className="basis-2/3 bg-neutral-100 h-160">
        <img
          src={`http://localhost:8080${selectedColor.images[0]}`}
          alt={`${brandName} ${modelName}`}
          className=" w-full h-160 object-contain"
        />
      </div>
      <div className="flex flex-col basis-1/3 h-full border border-neutral-200 bg-white rounded-md shadow-md">
        <div className="pl-2 pr-2">
          <ProductInfo product={product} selectedColor={selectedColor} />
          <form onSubmit={handleSubmit(onSubmit)} className="pt-5">
            <ProductColors
              product={product}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              register={register}
              errors={errors}
            />
            <ProductSizes
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              selectedColor={selectedColor}
              register={register}
              errors={errors}
              setValue={setValue}
            />
            <div className="flex items-center justify-center pt-2">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Adding..." : "Add to cart"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
