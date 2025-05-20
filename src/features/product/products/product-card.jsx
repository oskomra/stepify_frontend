"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }) {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const selectedVariant = product.colors[selectedColorIndex];
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/products/${product.brandName}/${product.modelName}`);
  };

  return (
    <div
      className="border rounded-lg shadow hover:border-neutral-300 hover:shadow-2xl transition duration-300 ease-in-out p-2 cursor-pointer"
      onClick={handleCardClick}
    >
      <img
        src={`http://localhost:8080${selectedVariant.images[0]}`}
        alt={`${product.brandName} ${product.modelName}`}
        className="h-48 w-full object-contain"
      />

      <div className="grid grid-cols-5">
        {product.colors.slice(0, 4).map((color, idx) => (
          <img
            key={idx}
            src={`http://localhost:8080${color.images[0]}`}
            alt={color.color}
            className={`w-12 h-12 rounded border cursor-pointer ${
              idx === selectedColorIndex ? "border-black" : "border-transparent"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedColorIndex(idx);
            }}
          />
        ))}
        {product.colors.length > 4 && (
          <span className="text-sm text-gray-500">
            +{product.colors.length - 4}
          </span>
        )}
      </div>

      <div className="p-2">
        <h2 className="text-base font-semibold">
          {product.brandName} {product.modelName}
        </h2>
        <h3 className="text-sm text-gray-500">{selectedVariant.color}</h3>
        <p className="text-lg font-semibold">${selectedVariant.price}</p>
      </div>
    </div>
  );
}
