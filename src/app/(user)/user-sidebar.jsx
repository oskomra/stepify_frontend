"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function UserSidebarPage({ selectedPage = "account" }) {
  const [selected, setSelected] = useState(selectedPage);

  useEffect(() => {
    setSelected(selectedPage);
  }, [selectedPage]);

  return (
    <div className="flex flex-col h-screen text-neutral-700 lg:border-r border-neutral-700">
      <nav>
        <Link
          href="/account"
          className={`relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors duration-150 ease-in-out hover:bg-neutral-700 hover:text-neutral-50 focus:bg-neutral-700 ${
            selected === "account" ? "bg-neutral-700 text-neutral-50" : ""
          }`}
          prefetch={false}
          onClick={() => setSelected("account")}
        >
          Your account
        </Link>
        <Link
          href="/orders"
          className={`relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors duration-150 ease-in-out hover:bg-neutral-700 hover:text-neutral-50 focus:bg-neutral-700 ${
            selected === "orders" ? "bg-neutral-700 text-neutral-50" : ""
          }`}
          prefetch={false}
          onClick={() => setSelected("orders")}
        >
          Orders
        </Link>
        <Link
          href="/addresses"
          className={`relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors duration-150 ease-in-out hover:bg-neutral-700 hover:text-neutral-50 focus:bg-neutral-700 ${
            selected === "addresses" ? "bg-neutral-700 text-neutral-50" : ""
          }`}
          prefetch={false}
          onClick={() => setSelected("addresses")}
        >
          Addresses
        </Link>
        <Link
          href="#"
          className={`relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors duration-150 ease-in-out hover:bg-neutral-700 hover:text-neutral-50 focus:bg-neutral-700 ${
            selected === "orderData" ? "bg-neutral-700 text-neutral-50" : ""
          }`}
          prefetch={false}
          onClick={() => setSelected("orderData")}
        >
          Order data
        </Link>
      </nav>
    </div>
  );
}
