"use client";
import useFetchUser from "@/hooks/useFetchUser";

export default function UserCard() {
  const { email, name, lastName, phone } = useFetchUser();

  return (
    <div>
      <h3 className="text-lg font-semibold">
        {name} {lastName}
      </h3>
      <p>{email}</p>
      <p>{phone}</p>
    </div>
  );
}
