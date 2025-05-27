"use client";
import { useDispatch } from "react-redux";
import { useState } from "react";
import useFetchAddresses from "@/hooks/useFetchAddresses";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import DeleteAddress from "./address-delete";
import EditAddress from "./address-edit";

export default function ChangeAddress() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { addresses, selectedAddress } = useFetchAddresses();
  const [tempSelectedAddress, setTempSelectedAddress] = useState(
    selectedAddress?.id?.toString() || ""
  );

  const handleAddressSelect = (addressId) => {
    setTempSelectedAddress(addressId);
  };

  const handleConfirm = () => {
    const selectedAddr = addresses.find(
      (addr) => addr.id === parseInt(tempSelectedAddress)
    );
    if (selectedAddr) {
      dispatch({
        type: "addresses/setSelectedAddress",
        payload: selectedAddr,
      });
    }
    setOpen(false);
  };

  const handleCancel = () => {
    setTempSelectedAddress(selectedAddress?.id?.toString() || "");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Change Address</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Select delivery address</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {addresses.length > 0 ? (
            <RadioGroup
              value={tempSelectedAddress}
              onValueChange={handleAddressSelect}
              className="space-y-4"
            >
              {addresses.map((address) => (
                <div key={address.id}>
                  <Card
                    className={`cursor-pointer transition-colors hover:bg-gray-50 ${
                      tempSelectedAddress === address.id.toString()
                        ? "border-primary"
                        : ""
                    }`}
                    onClick={() => handleAddressSelect(address.id.toString())}
                  >
                    <CardContent className="pt-6 flex items-start">
                      <RadioGroupItem
                        value={address.id.toString()}
                        id={`address-${address.id}`}
                        className="mt-1 mr-4"
                      />
                      <Label
                        htmlFor={`address-${address.id}`}
                        className="cursor-pointer flex-1"
                      >
                        <div className="space-y-1">
                          <p className="font-medium">{address.street}</p>
                          <p className="text-sm text-muted-foreground">
                            {address.city}, {address.postalCode}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {address.country}
                          </p>
                        </div>
                      </Label>
                      <div className="flex-justify-end mr-2">
                        <EditAddress address={address} />
                      </div>
                      <div className="flex justify-end mr-5">
                        <DeleteAddress
                          addressId={address.id}
                          setTempSelectedAddress={setTempSelectedAddress}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </RadioGroup>
          ) : (
            <div className="text-center py-4 text-muted-foreground">
              No addresses found. Please add an address first.
            </div>
          )}
        </div>
        <DialogFooter className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleConfirm}
            disabled={!tempSelectedAddress}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
