"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { ImageIcon } from "lucide-react";

// Assuming these are the possible promotion types from your backend
const PromotionType = {
  PERCENTAGE_DISCOUNT: "PERCENTAGE_DISCOUNT",
  FIXED_DISCOUNT: "FIXED_DISCOUNT",
  FREE_SHIPPING: "FREE_SHIPPING",
  BUY_ONE_GET_ONE: "BUY_ONE_GET_ONE",
};

const MAX_PROMOTIONS = 4;

export default function PromotionBanner() {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await fetch("http://localhost:8080/promotions/active");
        if (!response.ok) {
          throw new Error("Failed to fetch promotions");
        }
        const data = await response.json();
        // Handle both single promotion and array of promotions
        const promotionsArray = Array.isArray(data) ? data : [data];
        // Sort by end date (most recent first) and limit to MAX_PROMOTIONS
        const sortedPromotions = promotionsArray
          .sort((a, b) => new Date(b.endDate) - new Date(a.endDate))
          .slice(0, MAX_PROMOTIONS);
        setPromotions(sortedPromotions);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPromotions();
  }, []);

  const formatPromotionValue = (promotion) => {
    switch (promotion.promotionType) {
      case PromotionType.PERCENTAGE_DISCOUNT:
        return `${promotion.value}% OFF`;
      case PromotionType.FIXED_DISCOUNT:
        return `$${promotion.value} OFF`;
      case PromotionType.FREE_SHIPPING:
        return "FREE SHIPPING";
      case PromotionType.BUY_ONE_GET_ONE:
        return "BUY ONE GET ONE";
      default:
        return "";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="w-full h-64 bg-neutral-100 dark:bg-neutral-900 animate-pulse rounded-lg" />
    );
  }

  if (error || !promotions.length) {
    return null;
  }

  return (
    <Carousel className="w-full">
      <CarouselContent>
        {promotions.map((promotion) => (
          <CarouselItem key={promotion.id}>
            <Card className="border-0 bg-gradient-to-r from-neutral-800 to-neutral-900 text-neutral-100 overflow-hidden">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-2 min-h-[400px]">
                  <div className="relative bg-neutral-700/50 flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ImageIcon className="w-16 h-16 text-neutral-500" />
                    </div>
                    <img
                      src={`http://localhost:8080/images/promotion${promotion.id}.webp`}
                      alt={promotion.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex flex-col justify-center p-8 md:p-12">
                    <div className="max-w-xl mx-auto space-y-6">
                      <div className="inline-block px-3 py-1 bg-neutral-700/50 rounded-full text-sm font-medium">
                        {formatPromotionValue(promotion)}
                      </div>

                      <div className="space-y-4">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                          {promotion.name}
                        </h2>
                        <p className="text-lg text-neutral-300">
                          {promotion.description}
                        </p>
                      </div>

                      <div className="space-y-3 text-sm text-neutral-400">
                        {promotion.minimumOrderValue && (
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Minimum order:</span>
                            <span>${promotion.minimumOrderValue}</span>
                          </div>
                        )}
                        {promotion.code && (
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Promo code:</span>
                            <span className="font-mono bg-neutral-700/50 px-2 py-1 rounded">
                              {promotion.code}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Valid until:</span>
                          <span>{formatDate(promotion.endDate)}</span>
                        </div>
                      </div>

                      <div className="pt-4">
                        <Link
                          href="/products"
                          className="inline-flex h-12 items-center rounded-md bg-neutral-100 px-8 text-base font-medium text-neutral-900 shadow transition-colors hover:bg-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950"
                        >
                          Shop Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4 bg-neutral-800/80 hover:bg-neutral-800 text-neutral-100 border-neutral-700" />
      <CarouselNext className="right-4 bg-neutral-800/80 hover:bg-neutral-800 text-neutral-100 border-neutral-700" />
    </Carousel>
  );
}
