"use client";
import CustomSelect from "@/components/custom/custom-select";
import { useController } from "react-hook-form";

export default function RHFCustomSelect({
  name,
  control,
  options,
  placeholder,
}) {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <div>
      <CustomSelect
        options={options}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
}
