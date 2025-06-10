export default function OrderItem({ orderItems }) {
  return (
    <div>
      {orderItems.map((item) => (
        <div
          className="flex flex-col justify-between border-b-2 border-gray-200 py-2"
          key={item.id || `${item.modelName}-${item.color}-${item.size}`}
        >
          <div className="flex flex-row items-center w-full gap-5 h-14">
            <div>
              <img
                src={`http://localhost:8080/images/${item.modelName
                  .split(" ")
                  .join("_")}_${item.color}.webp`}
                alt={`${item.brandName} ${item.modelName}`}
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 object-contain rounded bg-white"
              />
            </div>
            <div>
              {item.brandName} {item.modelName}
              <div className="text-sm text-gray-500">
                {item.color} | {item.size}
              </div>
            </div>
            <div className="ml-auto flex items-center gap-4">
              <div className="text-md font-semibold">Price: ${item.price}</div>
              <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
