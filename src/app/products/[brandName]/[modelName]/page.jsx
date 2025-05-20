import { notFound } from "next/navigation";
import ProductDetails from "@/features/product/product-details/product-details";

export default async function ProductDetailsPage({ params }) {
  const { brandName, modelName } = params;
  const response = await fetch(
    `http://localhost:8080/products/${brandName}/${modelName}`
  );

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  const product = await response.json();

  return (
    <div className="flex flex-row px-75 py-25">
      <ProductDetails product={product} />
    </div>
  );
}
