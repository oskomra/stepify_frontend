"use client";
import { Accordion } from "@/components/ui/accordion";
import FilterSection from "../../../components/filter/filter-section";
import useFilterOptions from "@/hooks/useFilterOptions";
import useFetchProducts from "@/hooks/useFetchProducts";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addFilter, removeFilter } from "@/store/slices/productsSlice";

export default function ProductFilter() {
  const dispatch = useDispatch();
  const { products, loading, error } = useFetchProducts();
  const optionFilters = useFilterOptions(products);
  const [checkedState, setCheckedState] = useState({
    brandNames: {},
    categories: {},
    genders: {},
    colors: {},
    sizes: {},
  });

  if (loading) return <p>Loading filters…</p>;
  if (error) return <p>Failed to load filters</p>;

  const filterSections = [
    { name: "Brands", filterKey: "brandNames" },
    { name: "Categories", filterKey: "categories" },
    { name: "Genders", filterKey: "genders" },
    { name: "Colors", filterKey: "colors" },
    { name: "Sizes", filterKey: "sizes" },
  ];

  const handleFilterChange = (filterKey, value, isChecked) => {
    setCheckedState((prevState) => {
      const updatedState = { ...prevState };
      updatedState[filterKey][value] = isChecked;
      return updatedState;
    });

    const parsedValue =
      filterKey === "sizes"
        ? parseFloat(value)
        : filterKey === "categories" || filterKey === "genders"
        ? value.toUpperCase()
        : value;

    if (isChecked) {
      dispatch(addFilter({ filterType: filterKey, value: parsedValue }));
    } else {
      dispatch(removeFilter({ filterType: filterKey, value: parsedValue }));
    }
  };

  return (
    <Accordion type="multiple" collapsible="true" className="w-full">
      {filterSections.map((section) => (
        <FilterSection
          key={section.filterKey}
          title={section.name}
          options={optionFilters[section.filterKey]}
          filterKey={section.filterKey}
          checkedState={checkedState[section.filterKey]}
          onChange={handleFilterChange}
        />
      ))}
    </Accordion>
  );
}
