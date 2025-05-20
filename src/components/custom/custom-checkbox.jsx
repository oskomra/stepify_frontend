import { Checkbox } from "../ui/checkbox";

export default function CustomCheckbox({
  name,
  value,
  onCheckedChange,
  checked,
}) {
  return (
    <div className="pr-2">
      <Checkbox
        name={name}
        value={value}
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
    </div>
  );
}
