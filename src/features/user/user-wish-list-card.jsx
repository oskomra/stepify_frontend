"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function UserWishListCard() {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-neutral-700">
          Your Wish List
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          {/* Placeholder for wish list items */}
          <div className="text-neutral-500">No items in your wish list.</div>
        </div>
      </CardContent>
    </Card>
  );
}
