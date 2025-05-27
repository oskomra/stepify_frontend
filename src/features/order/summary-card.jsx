import { Button } from "@/components/ui/button";

export default function SummaryCard({
  productsPrice,
  deliveryPrice,
  totalPrice,
  handleOnClick,
  submitText,
}) {
  return (
    <div>
      <div className="flex flex-row justify-between mb-2">
        <div className="text-md font-semibold">Product:</div>
        <div className="text-md font-semibold">${productsPrice}</div>
      </div>
      <div className="flex flex-row justify-between mb-4">
        <div className="text-md font-semibold">Shipping:</div>
        <div className="text-md font-semibold">${deliveryPrice}</div>
      </div>
      <div className="flex flex-row justify-between border-t-2 border-gray-200 pt-4">
        <div className="text-lg font-semibold">Total:</div>
        <div className="text-lg font-semibold">${totalPrice.toFixed(2)}</div>
      </div>
      <Button className="mt-4 w-full" onClick={() => handleOnClick()}>
        {submitText}
      </Button>
    </div>
  );
}
