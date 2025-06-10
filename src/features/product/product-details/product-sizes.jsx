import ProductSizesConverter from "./product-sizes-converter";
import { useState } from "react";

export default function ProductDetailsSizes({
  selectedSize,
  setSelectedSize,
  selectedColor,
  register,
  setValue,
  errors,
}) {
  const [sizes, setSizes] = useState(selectedColor.sizes);

  function handleSizeClick(size) {
    setSelectedSize(size);
    setValue("size", size.size);
  }
  return (
    <div>
      <ProductSizesConverter
        sizes={sizes}
        setSizes={setSizes}
        selectedColor={selectedColor}
      />
      <span className="flex pt-5 font-bold">Select a size</span>
      <div className="flex items-center justify-center">
        <div className="grid grid-cols-2 sm:grid-cols- md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 py-2 w-full">
          {sizes.map((size, idx) =>
            size.stock > 0 ? (
              <div
                onClick={() => handleSizeClick(size)}
                key={idx}
                className={`h-10 w-full xs:w-8 sm:w-15 md:w-auto  border ${
                  selectedSize === size
                    ? "border-black bg-gray-200"
                    : "hover:border-black"
                } flex items-center justify-center rounded-md cursor-pointer bg-neutral-100`}
                {...register(`size`)}
              >
                {size.size}
              </div>
            ) : (
              <div
                key={idx}
                className="h-10 w-full xs:w-8 sm:w-15 md:w-auto border border-gray-300 flex items-center justify-center rounded-md cursor-not-allowed bg-neutral-200 text-gray-500"
              >
                {size.size}
              </div>
            )
          )}
        </div>
      </div>
      <input
        type="hidden"
        value={selectedSize ? selectedSize.size : ""}
        {...register("size")}
      />
      {errors.size && <p className="text-red-500">{errors.size.message}</p>}
    </div>
  );
}
