import ProductForm from "@/features/product/add-product/product-form";

export default function NewProductPage() {
  return (
    <div className="flex justify-center px-25 py-25">
      <div className="w-full max-w-2xl">
        <ProductForm />
      </div>
    </div>
  );
}
