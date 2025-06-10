export default function sortProducts(products, sortOption) {
  const sorted = [...products];

  switch (sortOption) {
    case "price-asc":
      sorted.sort((a, b) => {
        const aPrice = a.selectedPrice || a.colors[0].price;
        const bPrice = b.selectedPrice || b.colors[0].price;
        return aPrice - bPrice;
      });
      break;

    case "price-desc":
      sorted.sort((a, b) => {
        const aPrice = a.selectedPrice || a.colors[0].price;
        const bPrice = b.selectedPrice || b.colors[0].price;
        return bPrice - aPrice;
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
