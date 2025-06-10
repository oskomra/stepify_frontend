import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-neutral-800 text-neutral-100 border-t border-neutral-700">
      <div className="max-w-screen-2xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Site Name */}
        <div className="text-xl font-semibold">
          <Link href="/" className="hover:text-neutral-300">
            Stepify
          </Link>
        </div>
        {/* Navigation Links */}
        <nav className="flex gap-6 text-sm">
          <Link href="/" className="hover:text-neutral-300">
            Home
          </Link>
          <Link href="/products" className="hover:text-neutral-300">
            Products
          </Link>
          <Link href="/cart" className="hover:text-neutral-300">
            Cart
          </Link>
          <Link href="/account" className="hover:text-neutral-300">
            Account
          </Link>
        </nav>
        {/* Social Icons */}
        <div className="flex gap-4">
          <a href="#" aria-label="Facebook" className="hover:text-blue-400">
            <Facebook size={22} />
          </a>
          <a href="#" aria-label="Instagram" className="hover:text-pink-400">
            <Instagram size={22} />
          </a>
          <a href="#" aria-label="Twitter" className="hover:text-sky-400">
            <Twitter size={22} />
          </a>
        </div>
      </div>
      <div className="text-center text-xs text-neutral-400 pb-4">
        &copy; {new Date().getFullYear()} Stepify. All rights reserved.
      </div>
    </footer>
  );
}
