import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";

export default function RadioButton({ id, value, label, price, isSelected }) {
  return (
    <Label
      htmlFor={id}
      className={`flex items-center w-full gap-2 border pl-2 rounded-md cursor-pointer hover:bg-gray-100 ${
        isSelected ? "border-gray-600 bg-neutral-100" : ""
      }`}
    >
      <RadioGroupItem value={value} id={id} />
      <div className="flex flex-row items-center justify-between w-full p-4">
        <div>{label}</div>
        <div>{price}</div>
      </div>
    </Label>
  );
}
