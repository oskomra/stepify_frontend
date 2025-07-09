import { notFound } from "next/navigation";
import ProductDetails from "@/features/product/product-details/product-details";

export default async function ProductDetailsPage({ params }) {
  const { brandName, modelName } = params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${brandName}/${modelName}`
  );

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  const product = await response.json();

  return (
    <div className="px-4 py-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
      <ProductDetails product={product} />
    </div>
  );
}
