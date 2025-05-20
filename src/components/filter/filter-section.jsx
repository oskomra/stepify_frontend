"use client";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import CustomCheckbox from "../custom/custom-checkbox";

export default function FilterSection({
  title,
  options,
  filterKey,
  onChange,
  checkedState,
}) {
  return (
    <AccordionItem
      key={filterKey}
      value={`item-${filterKey}`}
      className="border border-neutral-200 rounded-sm shadow-sm mb-2"
    >
      <AccordionTrigger className="border-b rounded-none hover:no-underline hover:bg-neutral-100 px-5">
        {title}
      </AccordionTrigger>
      <AccordionContent className="flex justify-center items-center pb-0 border-b">
        <div className="flex flex-col gap-2 w-full px-5">
          {options.map((option) => (
            <label
              key={option}
              htmlFor={option}
              className="flex text-center items-center pt-2 pb-1"
            >
              <CustomCheckbox
                name={filterKey}
                value={option}
                checked={checkedState[option] || false}
                onCheckedChange={(isChecked) =>
                  onChange(filterKey, option, isChecked)
                }
              />
              {option}
            </label>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
