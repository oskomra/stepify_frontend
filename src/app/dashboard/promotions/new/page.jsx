import PromotionForm from "@/features/promotions/promotion-form";

export default function NewPromotionPage() {
  return (
    <div className="flex justify-center px-25 py-25">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl text-center font-bold mb-4">
          Add New Promotion
        </h1>
        <PromotionForm />
      </div>
    </div>
  );
}
