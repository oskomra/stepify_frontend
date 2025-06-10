"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function CartModal({
  product,
  open,
  setOpen,
  selectedColor,
  selectedSize,
}) {
  const router = useRouter();

  const handleClose = () => {
    setOpen(false);
  };

  const handleNavigateToCart = () => {
    setOpen(false);
    router.push("/cart"); // Navigate to the cart page
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {product.brandName} {product.modelName} added to cart
          </DialogTitle>
        </DialogHeader>
        <Card>
          <CardContent>
            <div className="flex flex-row items-center w-full gap-5 h-14">
              <div>
                <img
                  src={`http://localhost:8080/images/${product.modelName
                    .split(" ")
                    .join("_")}_${selectedColor.color}.webp`}
                  alt={`${product.brandName} ${product.modelName}`}
                  className="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 object-contain rounded bg-white"
                />
              </div>
              <div>
                {product.brandName} {product.modelName}
                <div className="text-sm text-gray-500">
                  {selectedColor.color} | {selectedSize.size}
                </div>
              </div>
              <div className="ml-auto flex items-center gap-4">
                <div className="text-md font-semibold">
                  Price: ${selectedColor.price}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <DialogFooter className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={handleClose}>
            Continue Shopping
          </Button>
          <Button type="button" onClick={handleNavigateToCart}>
            View Cart
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
