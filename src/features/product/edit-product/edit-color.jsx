"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SizeEdit from "./edit-size";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function EditColor({ product, setProduct }) {
  const [priceValues, setPriceValues] = useState(() =>
    Object.fromEntries(product.colors.map((c) => [c.id, c.price]))
  );
  const [error, setError] = useState({});
  const [openColorId, setOpenColorId] = useState(null);

  async function handleDeleteColor(id) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/colors/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (response.ok) {
        const updatedColors = product.colors.filter((color) => color.id !== id);
        setProduct((prevProduct) => ({
          ...prevProduct,
          colors: updatedColors,
        }));
        setPriceValues((prev) => {
          const copy = { ...prev };
          delete copy[id];
          return copy;
        });
      }
    } catch (error) {
      console.error("Error deleting color variant:", error);
    }
  }

  async function handleEditPrice(color) {
    const price = priceValues[color.id];
    if (price === "" || isNaN(Number(price))) {
      setError((prev) => ({
        ...prev,
        [color.id]: "Price must be a number",
      }));
      return;
    }
    setError((prev) => ({ ...prev, [color.id]: undefined }));

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/colors/${color.id}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ price }),
        }
      );
      if (response.ok) {
        const updatedColors = product.colors.map((c) =>
          c.id === color.id ? { ...c, price } : c
        );
        setProduct((prevProduct) => ({
          ...prevProduct,
          colors: updatedColors,
        }));
      }
    } catch (error) {
      setError((prev) => ({
        ...prev,
        [color.id]: "An error occurred. Please try again.",
      }));
    }
  }

  return (
    <div>
      <h1 className="text-center font-semibold">Color variants</h1>
      {product.colors.map((color) => (
        <div className="my-6 flex justify-center" key={color.id}>
          <Card className="w-full max-w-3xl shadow-lg border border-gray-200">
            <CardHeader>
              <CardTitle className="text-center pb-2">
                {color.color.toUpperCase()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-row space-x-4 pb-4">
                <Label htmlFor={`color-${color.id}`}>Color</Label>
                <Input
                  id={`color-${color.id}`}
                  type="text"
                  placeholder="Color"
                  value={color.color}
                  disabled
                />
                <Label htmlFor={`price-${color.id}`}>Price</Label>
                <Input
                  id={`price-${color.id}`}
                  type="text"
                  placeholder="Price"
                  value={priceValues[color.id] ?? ""}
                  onChange={(e) =>
                    setPriceValues((vals) => ({
                      ...vals,
                      [color.id]: e.target.value,
                    }))
                  }
                />
                <Button
                  type="button"
                  variant="destructive"
                  className="bg-green-500 text-white hover:bg-green-400"
                  onClick={() => handleEditPrice(color)}
                >
                  <FontAwesomeIcon icon={faPen} className="" />
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => handleDeleteColor(color.id)}
                  className="bg-red-500 text-white hover:bg-red-400"
                >
                  <FontAwesomeIcon icon={faTrash} className="" />
                </Button>
                {openColorId === color.id ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setOpenColorId(null)}
                    className=""
                  >
                    Close sizes
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setOpenColorId(color.id)}
                    className=""
                  >
                    Edit sizes
                  </Button>
                )}
              </div>
              {openColorId === color.id ? (
                <div>
                  <SizeEdit
                    product={product}
                    setProduct={setProduct}
                    color={color}
                  />
                </div>
              ) : (
                <div></div>
              )}
              {error[color.id] && (
                <p className=" text-center text-sm text-red-500">
                  {error[color.id]}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}
