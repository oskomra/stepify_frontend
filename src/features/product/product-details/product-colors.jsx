export default function ProductDetailsColors({
  product,
  selectedColor,
  setSelectedColor,
  register,
  errors,
  setValue,
}) {
  function handleColorClick(color) {
    setSelectedColor(color); // store the whole color object
    setValue("color", color.color);
  }

  return (
    <div className="flex items-center justify-start">
      <div className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 py-5">
        {product.colors.map((color, idx) => (
          <img
            key={idx}
            onClick={() => handleColorClick(color)}
            src={`${process.env.NEXT_PUBLIC_API_URL}${color.images[0]}`}
            alt={color.color}
            className={`w-12 h-12 rounded border cursor-pointer ${
              selectedColor && selectedColor.color === color.color
                ? "border-black"
                : "border-transparent"
            } flex items-center justify-center rounded-md cursor-pointer`}
          />
        ))}
      </div>
      <input
        type="hidden"
        value={selectedColor ? selectedColor.color : ""}
        {...register(`color`)}
      />
      {errors.color && <p className="text-red-500">{errors.color.message}</p>}
    </div>
  );
}
