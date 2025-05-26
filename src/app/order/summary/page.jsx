export default function OrderSummaryPage() {
  return (
    <div className="flex flex-col lg:flex-row gap-8 px-4 md:px-12 lg:px-32 xl:px-32 py-25 items-start justify-center w-full">
      <div className="w-full lg:w-2/3 pt-5">
        {/* Shipping Details Component can be added here */}
      </div>
      <div className="w-full lg:w-1/3">
        {/* Order Summary Component can be added here */}
      </div>
    </div>
  );
}
