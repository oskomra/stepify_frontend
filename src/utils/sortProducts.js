export default function sortProducts(products, sortOption) {
  const sorted = [...products];

  switch (sortOption) {
    case "price-asc":
      sorted.sort((a, b) => {
        const aMax = Math.max(...a.colors.map((c) => c.price));
        const bMax = Math.max(...b.colors.map((c) => c.price));
        return aMax - bMax;
      });
      break;

    case "price-desc":
      sorted.sort((a, b) => {
        const aMax = Math.max(...a.colors.map((c) => c.price));
        const bMax = Math.max(...b.colors.map((c) => c.price));
        return bMax - aMax;
      });
      break;

    case "name-asc":
      sorted.sort((a, b) => a.brandName.localeCompare(b.brandName));
      break;

    case "name-desc":
      sorted.sort((a, b) => b.brandName.localeCompare(a.brandName));
      break;

    default:
      break;
  }

  return sorted;
}
