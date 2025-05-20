export function flattenProductsByColorVariant(products) {
  return products.flatMap((product) =>
    product.colors.map((color) => ({
      ...color,
      brandName: product.brandName,
      modelName: product.modelName,
      description: product.description,
      category: product.category,
      gender: product.gender,
    }))
  );
}
