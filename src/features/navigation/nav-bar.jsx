"use client";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import UserDropdownMenu from "./user-dropdownmenu.jsx";
import CartDropdownMenu from "./cart-dropdownmenu.jsx";

export default function Navbar() {
  return (
    <nav className="bg-neutral-800 text-neutral-100 shadow-lg p-4">
      <div className="flex items-center justify-center">
        <div className="text-2xl font-semibold text-neutral-100">
          <a href="/" className="hover:text-neutral-300">
            Stepify
          </a>
        </div>

        <div className="w-100 mr-10 ml-5">
          <Input className="" placeholder="Search..." />
        </div>

        <div className="hover:bg-neutral-700 rounded-lg">
          <UserDropdownMenu />
        </div>

        <div className="hover:bg-neutral-700 rounded-lg">
          <CartDropdownMenu />
        </div>
      </div>
    </nav>
  );
}
