"use client";
import ProductCard from "./product-card.jsx";
import useFetchFilteredProducts from "@/hooks/useFetchFilteredProducts.js";

export default function ProductCatalog() {
  const { filteredProducts, loading, error } = useFetchFilteredProducts();

  if (loading) return <p>Loading products…</p>;
  if (error) return <p>Failed to load products</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
      {filteredProducts.map((product) => (
        <div key={product.id} className="min-w-[200px] w-full">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
