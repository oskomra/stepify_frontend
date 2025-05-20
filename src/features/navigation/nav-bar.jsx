"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/provider/AuthProvider";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const { token, logout } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [token]);

  return (
    <nav className="bg-neutral-800 text-neutral-100 shadow-lg p-4">
      <div className="flex items-center justify-center">
        {/* Logo Section */}
        <div className="text-2xl font-semibold text-neutral-100">
          <a href="/" className="hover:text-neutral-300">
            Stepify
          </a>
        </div>

        {/* Search Bar Section */}
        <div className="w-100 mr-10 ml-5">
          <Input className="" placeholder="Search..." />
        </div>

        {/* Navbar Links */}
        <div className="hover:bg-neutral-700 p-2 rounded-lg">
          {isLoggedIn ? (
            <div onClick={logout} className="flex items-center gap-2">
              <div className=" text-neutral-300">Log out</div>
              <FontAwesomeIcon
                icon={faUser}
                className="text-neutral-300 w-6 h-6"
              />
            </div>
          ) : (
            <Link href="/login" className="flex items-center gap-2">
              <div className="text-neutral-300">Sign in</div>
              <FontAwesomeIcon
                icon={faUser}
                className="text-neutral-300 w-6 h-6"
              />
            </Link>
          )}
        </div>
        <Link href="/cart">
          <div className="hover:bg-neutral-700 p-2 rounded-lg">
            <FontAwesomeIcon
              icon={faCartShopping}
              className="text-neutral-300"
            />
          </div>
        </Link>
      </div>
    </nav>
  );
}
