import { useMemo } from "react";

export default function useFilterOptions(products) {
  return useMemo(() => {
    const unique = (arr) => [...new Set(arr)].sort();

    const brandNames = unique(products.map((p) => p.brandName));
    const categories = unique(products.map((p) => p.category));
    const genders = unique(products.map((p) => p.gender));
    const colors = unique(
      products.flatMap((p) => p.colors.map((c) => c.color))
    );
    const sizes = unique(
      products.flatMap((p) =>
        p.colors.flatMap((color) => color.sizes.map((s) => s.size))
      )
    );

    return {
      brandNames,
      categories,
      genders,
      colors,
      sizes,
    };
  }, [products]);
}
