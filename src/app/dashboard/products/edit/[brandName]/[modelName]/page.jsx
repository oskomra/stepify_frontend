import EditProduct from "@/features/product/edit-product/edit-product";

export default async function EditProductPage({ params }) {
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
    <div className="flex flex-col items-center w-full min-h-screen px-2 py-6 sm:px-4 md:px-8 lg:px-16 xl:px-32 bg-background">
      <div className="w-full max-w-5xl">
        <EditProduct productDetails={product} />
      </div>
    </div>
  );
}
