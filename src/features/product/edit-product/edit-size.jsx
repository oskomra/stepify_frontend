import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import AddSize from "./add-size";
export default function SizeEdit({ color, product, setProduct }) {
  const [errors, setErrors] = useState({});
  const [stockValues, setStockValues] = useState(() =>
    Object.fromEntries(color.sizes.map((s) => [s.id, s.stock]))
  );

  async function handleDeleteSize(id) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/sizes/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (response.ok) {
        const updatedSizes = product.colors.map((color) => ({
          ...color,
          sizes: color.sizes.filter((size) => size.id !== id),
        }));
        setProduct((prevProduct) => ({
          ...prevProduct,
          colors: updatedSizes,
        }));
      }
    } catch (error) {
      console.error("Error deleting size variant:", error);
    }
  }

  async function handleEditStock(size) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/sizes/${size.id}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ stock: stockValues[size.id] }),
        }
      );
      if (response.ok) {
        const updatedColors = product.colors.map((c) =>
          c.id === color.id
            ? {
                ...c,
                sizes: c.sizes.map((s) =>
                  s.id === size.id ? { ...s, stock: stockValues[size.id] } : s
                ),
              }
            : c
        );
        setProduct((prevProduct) => ({
          ...prevProduct,
          colors: updatedColors,
        }));
      } else if (response.status === 400) {
        const errorData = await response.json();
        setErrors((prev) => ({
          ...prev,
          [size.id]: errorData.message || "Invalid stock value",
        }));
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        [size.id]: "Network error when updating stock",
      }));
    }
  }

  return (
    <div>
      {color.sizes.map((size) => (
        <div key={size.id}>
          <div className="flex flex-row space-x-4 pt-4 items-center">
            <Label htmlFor={`size-${size.id}`}>Size</Label>
            <Input
              id={`size-${size.id}`}
              type="text"
              placeholder="Size"
              value={size.size}
              disabled
            />
            <Label htmlFor={`stock-${size.id}`}>Stock</Label>
            <Input
              id={`stock-${size.id}`}
              type="number"
              placeholder={size.stock}
              value={stockValues[size.id] ?? ""}
              onChange={(e) =>
                setStockValues((vals) => ({
                  ...vals,
                  [size.id]: e.target.value,
                }))
              }
            />
            <Button
              type="button"
              variant="destructive"
              className="bg-green-500 text-white hover:bg-green-400"
              onClick={() => handleEditStock(size)}
            >
              <FontAwesomeIcon icon={faPen} className="" />
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => handleDeleteSize(size.id)}
              className="bg-red-500 text-white hover:bg-red-400"
            >
              <FontAwesomeIcon icon={faTrash} className="" />
            </Button>
          </div>
          {errors[size.id] && (
            <p className="text-sm text-red-500 ml-24 mt-1 flex justify-center mr-40">
              {errors[size.id]}
            </p>
          )}
        </div>
      ))}

      <div className="pt-8">
        <AddSize color={color} product={product} setProduct={setProduct} />
      </div>
    </div>
  );
}
