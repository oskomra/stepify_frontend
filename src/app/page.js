"use client";
import Link from "next/link";
import ProductCatalog from "@/features/product/products/product-catalog.jsx";
import PromotionBanner from "@/components/ui/promotion-banner";

export default function Home() {
  return (
    <div className="flex flex-col gap-12 px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 py-8 w-full max-w-screen-2xl mx-auto">
      <section className="relative min-h-[500px] rounded-lg shadow overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}/images/banner.png`}
            alt="Stepify Hero"
            className="w-full h-full object-cover opacity-50"
          />
        </div>

        <div className="relative flex flex-col items-center justify-center text-center py-16 px-4 h-full">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
              Welcome to Stepify
            </h1>
            <p className="text-lg sm:text-xl text-white max-w-2xl mx-auto">
              Discover the latest trends in footwear for Men, Women, and Kids.
              Shop top brands, exclusive deals, and find your perfect pair
              today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href="/products"
                className="inline-flex h-12 items-center justify-center rounded-md bg-white px-8 text-lg font-medium text-neutral-900 shadow transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PromotionBanner />

      <section>
        <h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-100 mb-6">
          Featured Products
        </h2>
        <ProductCatalog />
      </section>
    </div>
  );
}
