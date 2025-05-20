"use client";
import ProductCatalog from "@/features/product/products/product-catalog.jsx";
import ProductFilter from "@/features/product/products/product-filter";
import ProductSearch from "@/features/product/products/product-search";
import ProductSort from "@/features/product/products/product-sort";

export default function ProductPage() {
  return (
    <div className="flex flex-row flex-nowrap gap-8 px-50 py-25 item-center justify-center">
      <div className="basis=1/3 w-40">
        <ProductFilter />
      </div>
      <div className="basis-2/3">
        <div className="flex">
          <div className="basis-2/3">
            <ProductSearch />
          </div>
          <div className="basis-1/3">
            <ProductSort />
          </div>
        </div>
        <ProductCatalog />
      </div>
    </div>
  );
}
