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
import AddAddress from "../address/address-add";
import { useSelector, useDispatch } from "react-redux";
import useFetchAddresses from "@/hooks/useFetchAddresses";
import AddressCard from "../address/address-card";
import ChangeAddress from "../address/address-change";
import UserCard from "../user/user-card";
import UserEdit from "../user/user-edit";
import OrderSummary from "./order-summary";
import { useRouter } from "next/navigation";

export default function ShippingDetails() {
  const dispatch = useDispatch();
  const [isInpostSelected, setIsInpostSelected] = useState(false);
  const [isCourierSelected, setIsCourierSelected] = useState(true);
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] =
    useState("Courier");
  const [selectedDeliveryCompany, setSelectedDeliveryCompany] =
    useState("FedEx");
  const [shippingPrice, setShippingPrice] = useState(5);
  const { selectedAddress } = useFetchAddresses();
  const user = useSelector((state) => state.user);
  const router = useRouter();

  function handleDeliveryMethodChange(value) {
    if (value === "inpost_parcel") {
      setIsInpostSelected(true);
      setIsCourierSelected(false);
      setSelectedDeliveryMethod("Parcel");
      setSelectedDeliveryCompany("InPost");
      setShippingPrice(5);
    } else if (value === "courier") {
      setIsCourierSelected(true);
      setIsInpostSelected(false);
      setSelectedDeliveryMethod("Courier");
    }
  }

  function handleDeliveryCompanyChange(value) {
    setSelectedDeliveryCompany(value);
    dispatch({
      type: "orders/setDeliveryCompany",
      payload: value,
    });
  }

  function handleSubmitOnClick() {
    dispatch({
      type: "orders/setDeliveryMethod",
      payload: selectedDeliveryMethod,
    });
    dispatch({
      type: "orders/setDeliveryCompany",
      payload: selectedDeliveryCompany,
    });
    router.push("/order/summary");
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 px-4 md:px-12 lg:px-32 xl:px-64 py-25 items-start justify-center w-full">
      <div className="w-full lg:w-2/3 pt-5">
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Delivery Method</CardTitle>
              <CardDescription>Choose your delivery method</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                defaultValue="courier"
                onValueChange={handleDeliveryMethodChange}
                className="flex flex-col gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="courier" id="courier" />
                  <Label htmlFor="courier">Courier</Label>
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
          {isCourierSelected && (
            <Card>
              <CardHeader>
                <CardTitle>Delivery Company</CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  defaultValue="FedEx"
                  onValueChange={handleDeliveryCompanyChange}
                  className="flex flex-col gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="FedEx" id="FedEx" />
                    <Label htmlFor="FedEx">FedEx - $5</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="DPD" id="DPD" />
                    <Label htmlFor="DPD">DPD - $15</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="UPS" id="UPS" />
                    <Label htmlFor="UPS">UPS - $10</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          )}
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
      </div>
      <div className="w-full lg:w-1/3">
        <OrderSummary handleSubmitOnClick={handleSubmitOnClick} />
      </div>
    </div>
  );
}
