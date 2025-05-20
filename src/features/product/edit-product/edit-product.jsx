"use client";

import { useState } from "react";
import EditColor from "./edit-color";
import ProductInfo from "./product-info";
import AddColor from "./add-color";

export default function EditProduct({ productDetails }) {
  const [product, setProduct] = useState(productDetails);

  return (
    <div className="flex flex-col lg:flex-row w-full gap-8">
      <div className="w-full lg:w-1/3">
        <div className="flex flex-col gap-8">
          <ProductInfo product={product} />
          <AddColor product={product} setProduct={setProduct} />
        </div>
      </div>
      <div className="w-full lg:w-2/3">
        <div className="flex flex-col gap-8">
          <EditColor product={product} setProduct={setProduct} />
        </div>
      </div>
    </div>
  );
}
