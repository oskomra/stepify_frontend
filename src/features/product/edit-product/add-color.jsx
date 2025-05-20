import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const colorSchema = Yup.object({
  color: Yup.string().required("Color is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .required("Price is required"),
  size: Yup.string().required("Size is required"),
  stock: Yup.number()
    .typeError("Stock must be a number")
    .required("Stock is required"),
  image: Yup.mixed().required("Image is required"),
});

export default function AddColor({ product, setProduct }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(colorSchema),
  });

  async function addColorOnSubmit(data) {
    const formData = new FormData();

    const colorData = {
      color: data.color,
      price: data.price,
      sizes: [
        {
          size: data.size,
          stock: data.stock,
        },
      ],
      images: [],
    };

    formData.append(
      "color",
      new Blob([JSON.stringify(colorData)], { type: "application/json" })
    );

    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }

    try {
      const response = await fetch(
        `http://localhost:8080/colors/${product.id}`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      if (response.ok) {
        const newColor = await response.json();
        setProduct((prevProduct) => ({
          ...prevProduct,
          colors: [...prevProduct.colors, newColor],
        }));
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
          <CardTitle>Add new color variant</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(addColorOnSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Label htmlFor="color">Color</Label>
                <Input
                  id="color"
                  type="text"
                  placeholder="Color"
                  {...register("color")}
                />
                {errors.color && (
                  <p className="text-sm text-red-500">{errors.color.message}</p>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="text"
                  placeholder="Price"
                  {...register("price")}
                />
                {errors.price && (
                  <p className="text-sm text-red-500">{errors.price.message}</p>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="size">Size</Label>
                <Input
                  id="size"
                  type="text"
                  placeholder="Size"
                  {...register("size")}
                />
                {errors.size && (
                  <p className="text-sm text-red-500">{errors.size.message}</p>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  type="text"
                  placeholder="Stock"
                  {...register("stock")}
                />
                {errors.stock && (
                  <p className="text-sm text-red-500">{errors.stock.message}</p>
                )}
              </div>
              <div className="flex items-center space-x-2">
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
              <div className="col-span-full flex justify-center">
                <Button type="submit" className="">
                  Add color variant
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
    </div>
  );
}
