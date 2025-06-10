"use client";
import Link from "next/link";
import ProductCatalog from "@/features/product/products/product-catalog.jsx";

export default function Home() {
  return (
    <div className="flex flex-col gap-12 px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 py-8 w-full max-w-screen-2xl mx-auto">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-12 gap-6 bg-neutral-100 dark:bg-neutral-900 rounded-lg shadow">
        <h1 className="text-4xl sm:text-5xl font-bold text-neutral-800 dark:text-neutral-100 tracking-tight">
          Welcome to Stepify
        </h1>
        <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl">
          Discover the latest trends in footwear for Men, Women, and Kids. Shop
          top brands, exclusive deals, and find your perfect pair today!
        </p>
        <Link
          href="/products"
          className="inline-flex h-12 items-center rounded-md bg-neutral-800 px-8 text-lg font-medium text-neutral-50 shadow transition-colors hover:bg-neutral-900/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90 dark:focus-visible:ring-neutral-300"
        >
          Shop Now
        </Link>
      </section>

      {/* Featured Products Section */}
      <section>
        <h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-100 mb-6">
          Featured Products
        </h2>
        <ProductCatalog />
      </section>
    </div>
  );
}
