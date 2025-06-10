import UserOrderCard from "@/features/user/user-order-card";

export default function UserOrdersPage() {
  return (
    <div>
      <h1 className="text-3xl text-neutral-700 font-semibold">
        Orders history
      </h1>
      <div className="flex flex-col mt-4">
        <UserOrderCard />
      </div>
    </div>
  );
}
