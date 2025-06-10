import WishListCard from "@/features/user/user-wish-list-card";

export default function UserWishListPage() {
  return (
    <div>
      <h1 className="text-3xl text-neutral-700 font-semibold">Wish Lists</h1>
      <div className="flex flex-col mt-4">
        <WishListCard />
      </div>
    </div>
  );
}
