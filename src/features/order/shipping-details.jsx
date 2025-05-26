"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import AddAddress from "../address/add-address";
import { useSelector, useDispatch } from "react-redux";
import useFetchAddresses from "@/hooks/useFetchAddresses";
import AddressCard from "../address/address-card";
import ChangeAddress from "../address/change-address";
import UserCard from "../user/user-card";
import UserEdit from "../user/user-edit";

export default function ShippingDetails() {
  const dispatch = useDispatch();
  const [isInpostSelected, setIsInpostSelected] = useState(false);
  const [isCourierSelected, setIsCourierSelected] = useState(true);
  const { addresses, selectedAddress } = useFetchAddresses();
  const user = useSelector((state) => state.user);

  function handleRadioChange(value) {
    if (value === "inpost_parcel") {
      setIsInpostSelected(true);
      setIsCourierSelected(false);
      dispatch({ type: "orders/reduceTotalPrice", payload: 5 });
      dispatch({ type: "orders/setDeliveryPrice", payload: 5 });
    } else if (value === "courier") {
      setIsCourierSelected(true);
      setIsInpostSelected(false);
      dispatch({ type: "orders/addTotalPrice", payload: 5 });
      dispatch({ type: "orders/setDeliveryPrice", payload: 10 });
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Delivery Method</CardTitle>
          <CardDescription>Choose your delivery method</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            defaultValue="courier"
            onValueChange={handleRadioChange}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="courier" id="courier" />
              <Label htmlFor="courier">Courier (DPD) - $10</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="inpost_parcel" id="inpost_parcel" />
              <Label htmlFor="inpost_parcel">InPost Parcel - $5</Label>
            </div>
          </RadioGroup>

          <div className="flex flex-col mt-4">
            {isInpostSelected && (
              <Card>
                <CardHeader>
                  <CardTitle>InPost Parcel</CardTitle>
                  <CardDescription>
                    Choose your InPost parcel locker
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Label htmlFor="inpost_locker">Locker ID</Label>
                  <Input
                    type="text"
                    id="inpost_locker"
                    placeholder="Enter your InPost locker ID"
                  />
                </CardContent>
              </Card>
            )}
            {isCourierSelected && (
              <Card>
                <CardHeader>
                  <CardTitle>Shipping address</CardTitle>
                  <CardDescription>
                    Choose your shipping address
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-row gap-4 items-center justify-between">
                    <AddressCard address={selectedAddress} />
                    <div className="flex gap-2">
                      <ChangeAddress />
                      <AddAddress />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Buyer Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row gap-4 items-center justify-between">
            <UserCard />
            <div className="flex justify-end mr-6">
              <UserEdit user={user} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
