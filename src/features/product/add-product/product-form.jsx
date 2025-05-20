"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import RHFCustomSelect from "@/components/custom/rhf-custom-select";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const productSchema = Yup.object({
  brandName: Yup.string().required("Brand Name is required"),
  modelName: Yup.string().required("Password is required"),
  category: Yup.string().required("Category is required"),
  gender: Yup.string().required("Gender is required"),
  color: Yup.string().required("Color is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .required("Price is required"),
  size: Yup.number()
    .typeError("Size must be a number")
    .required("Size is required"),
  stock: Yup.number()
    .typeError("Stock must be a number")
    .required("Stock is required"),
});

export default function ProductForm() {
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: yupResolver(productSchema),
  });

  async function onSubmit(data) {
    const formData = new FormData();

    const productData = {
      brandName: data.brandName,
      modelName: data.modelName,
      category: data.category,
      gender: data.gender,
      description: data.description,
      colors: [
        {
          color: data.color,
          price: data.price,
          sizes: [
            {
              size: data.size,
              stock: data.stock,
            },
          ],
          images: [],
        },
      ],
    };

    formData.append(
      "product",
      new Blob([JSON.stringify(productData)], { type: "application/json" })
    );

    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }

    try {
      const response = await fetch("http://localhost:8080/products", {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      if (response.ok) {
        router.push("/dashboard/products");
      } else {
        if (response.status === 409) {
          setError("root.serverError", {
            type: "manual",
            message: "Product already exists",
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
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Add new product</CardTitle>
          <CardDescription>
            Enter the product details below to add a new product to the
            inventory.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 mb-4">
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                <div>
                  <Label htmlFor="brandName">Brand Name</Label>
                  <Input
                    id="brandName"
                    type="text"
                    placeholder="Brand Name"
                    {...register("brandName")}
                  />
                  {errors.brandName && (
                    <p className="text-sm text-red-500">
                      {errors.brandName.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="modelName">Model Name</Label>
                  <Input
                    id="modelName"
                    type="text"
                    placeholder="Model Name"
                    {...register("modelName")}
                  />
                  {errors.modelName && (
                    <p className="text-sm text-red-500">
                      {errors.modelName.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    type="text"
                    placeholder="Category"
                    {...register("category")}
                  />
                  {errors.gender && (
                    <p className="text-sm text-red-500">
                      {errors.gender.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <RHFCustomSelect
                    name="gender"
                    control={control}
                    options={[
                      { value: "MEN", label: "MEN" },
                      { value: "WOMEN", label: "WOMEN" },
                    ]}
                    placeholder="Select Gender"
                  />
                </div>
                <div>
                  <Label htmlFor="color">Color</Label>
                  <Input
                    id="color"
                    type="text"
                    placeholder="Color"
                    {...register("color")}
                  />
                  {errors.color && (
                    <p className="text-sm text-red-500">
                      {errors.color.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="text"
                    placeholder="Price"
                    {...register("price")}
                  />
                  {errors.price && (
                    <p className="text-sm text-red-500">
                      {errors.price.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="size">Size</Label>
                  <Input
                    id="size"
                    type="text"
                    placeholder="Size"
                    {...register("size")}
                  />
                  {errors.size && (
                    <p className="text-sm text-red-500">
                      {errors.size.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="stock">Stock</Label>
                  <Input
                    id="stock"
                    type="text"
                    placeholder="stock"
                    {...register("stock")}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Description"
                  rows={4}
                  {...register("description")}
                />
                {errors.description && (
                  <p className="text-sm text-red-500">
                    {errors.description.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="image">Image</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  {...register("image")}
                />
                {errors.image && (
                  <p className="text-sm text-red-500">{errors.image.message}</p>
                )}
              </div>
            </div>
            <Button type="submit" className="w-full">
              Add Product
            </Button>
            {errors.root?.serverError && (
              <p className="mt-4 text-sm text-red-500 text-center">
                {errors.root.serverError.message}
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
