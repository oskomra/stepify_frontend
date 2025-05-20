"use client";
import CustomSelect from "../../../components/custom/custom-select";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { sortFilteredProducts } from "@/store/slices/productsSlice";

export default function ProductSort() {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState("");

  const sortOptions = [
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "name-asc", label: "Name: A to Z" },
    { value: "name-desc", label: "Name: Z to A" },
  ];

  function handleSortChange(value) {
    setSelectedOption(value);
    dispatch(sortFilteredProducts(value));
  }

  return (
    <div className="flex pl-30 justify-end mb-8">
      <CustomSelect
        options={sortOptions}
        value={selectedOption}
        onChange={handleSortChange}
        placeholder="Sort by"
        className="w-[180px]"
      />
    </div>
  );
}
