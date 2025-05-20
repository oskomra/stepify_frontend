export default function ProductDetailsInfo({ product, selectedColor }) {
  const { brandName, modelName } = product;

  return (
    <div>
      <h1 className="font-bold pt-5 pb-2 sm:text-sm md:text-xl text-start">
        {brandName} {modelName}
      </h1>
      <h2 className="text-start font-thin sm:text-sm md:text-base text-2xl">
        ${selectedColor.price}
      </h2>
      <h3 className=" text-gray-500">{selectedColor.color}</h3>
    </div>
  );
}
