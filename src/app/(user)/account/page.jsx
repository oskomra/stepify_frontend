import UserAccountCard from "@/features/user/user-account-card";

export default function UserAccountPage() {
  return (
    <div>
      <h1 className="text-3xl text-neutral-700 font-semibold">
        Account settings
      </h1>
      <div className="flex flex-col mt-4">
        <UserAccountCard />
      </div>
    </div>
  );
}
