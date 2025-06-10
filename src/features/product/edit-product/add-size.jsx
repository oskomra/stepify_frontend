import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const sizeSchema = Yup.object({
  size: Yup.string().required("Size is required"),
  stock: Yup.number()
    .typeError("Stock must be a number")
    .required("Stock is required"),
});

export default function AddSize({ color, product, setProduct }) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(sizeSchema),
  });

  async function onSubmit(data) {
    try {
      const response = await fetch(`http://localhost:8080/sizes/${color.id}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const newSize = await response.json();
        const updatedColors = product.colors.map((c) =>
          c.id === color.id
            ? {
                ...c,
                sizes: [...c.sizes, newSize],
              }
            : c
        );
        setProduct((prevProduct) => ({
          ...prevProduct,
          colors: updatedColors,
        }));
      }
      if (response.status === 400) {
        const errorData = await response.json();
        setError("root.serverError", {
          type: "manual",
          message:
            errorData.message || "Invalid input. Please check your data.",
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
    <div className="border-0 border-neutral-600 border-t-2 pt-2">
      <h1 className="text-center font-semibold">Add new size</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-row space-x-4 pt-2 items-center"
      >
        <Label htmlFor={`size-${color.color}`}>Size</Label>
        <Input
          id={`size-${color.color}`}
          type="text"
          placeholder="Size"
          {...register("size")}
        />
        <Label htmlFor={`stock-${color.color}`}>Stock</Label>
        <Input
          id={`stock-${color.color}`}
          type="text"
          placeholder="Stock"
          {...register("stock")}
        />
        <Button type="submit">Add size</Button>
      </form>
      {errors.root?.serverError && (
        <p className="mt-4 text-sm text-red-500 text-center">
          {errors.root.serverError.message}
        </p>
      )}
    </div>
  );
}
