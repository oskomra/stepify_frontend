"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/provider/AuthProvider";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function UserDropdownMenu() {
  const router = useRouter();
  const { token, logout } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [token]);

  const handleNavigation = (selectedPage) => {
    router.push(`/${selectedPage}`);
  };

  return (
    <div className="flex justify-between">
      <div className="flex space-x-4">
        <div className="group relative">
          <Button variant="primary" className="inline-flex items-center gap-2">
            <FontAwesomeIcon
              icon={faUser}
              className="text-neutral-300 w-4 h-4"
            />
          </Button>
          <div className="absolute right-0 lg:left-0 z-10 hidden w-56 rounded-md border text-neutral-300 border-neutral-700 bg-neutral-800 p-1 shadow-md animate-in fade-in-80 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 group-hover:block">
            <Button
              variant="ghost"
              className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-neutral-700 hover:text-neutral-50 focus:bg-neutral-700 justify-start font-normal"
              onClick={() => handleNavigation("account")}
            >
              Your account
            </Button>
            <Button
              variant="ghost"
              className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-neutral-700 hover:text-neutral-50 focus:bg-neutral-700 justify-start font-normal"
              onClick={() => handleNavigation("orders")}
            >
              Orders
            </Button>
            <Button
              variant="ghost"
              className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-neutral-700 hover:text-neutral-50 focus:bg-neutral-700 justify-start font-normal"
              onClick={() => handleNavigation("addresses")}
            >
              Addresses
            </Button>
            <Button
              variant="ghost"
              className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-neutral-700 hover:text-neutral-50 focus:bg-neutral-700 justify-start font-normal"
              onClick={() => handleNavigation("wishList")}
            >
              Wish Lists
            </Button>
            <div className="mx-1 my-1 h-px bg-neutral-500"></div>
            {isLoggedIn ? (
              <Button
                variant="ghost"
                className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-neutral-700 hover:text-neutral-50 focus:bg-neutral-700 justify-start font-normal"
                onClick={logout}
              >
                Log out
              </Button>
            ) : (
              <Button
                variant="ghost"
                className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-neutral-700 hover:text-neutral-50 focus:bg-neutral-700 justify-start font-normal"
                onClick={() => router.push("/login")}
              >
                Sign in
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
