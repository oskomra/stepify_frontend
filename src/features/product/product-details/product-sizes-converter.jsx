"use client";
import convertShoeSize from "@/utils/convertShoeSize";
import CustomSelect from "@/components/custom/custom-select";
import { useState, useEffect } from "react";

export default function ProductSizesConverter({
  sizes,
  setSizes,
  selectedColor,
}) {
  const [selectedSizeSystem, setSelectedSizeSystem] = useState("eu");
  const sizeOptions = [
    { value: "eu", label: "EU" },
    { value: "uk", label: "UK" },
    { value: "us", label: "US" },
  ];

  useEffect(() => {
    setSizes(convertShoeSize("eu", selectedSizeSystem, selectedColor.sizes));
  }, [selectedColor]);

  function handleSizeSystemChange(current, target, sizes) {
    const converted = convertShoeSize(current, target, sizes);
    setSizes(converted);
    setSelectedSizeSystem(target);
  }

  return (
    <div className="flex items-center justify-center w-full pt-5">
      <CustomSelect
        options={sizeOptions}
        value={selectedSizeSystem}
        onChange={(newSizeSystem) =>
          handleSizeSystemChange(selectedSizeSystem, newSizeSystem, sizes)
        }
        className="w-full"
      />
    </div>
  );
}
