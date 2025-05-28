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
import { useEffect, useState } from "react";
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
import RadioButton from "@/components/ui/radio-button";

export default function ShippingDetails() {
  const dispatch = useDispatch();
  const [isInpostSelected, setIsInpostSelected] = useState(false);
  const [isCourierSelected, setIsCourierSelected] = useState(true);
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] =
    useState("Courier");
  const [selectedDeliveryCompany, setSelectedDeliveryCompany] =
    useState("FedEx");
  const [selectedPayment, setSelectedPayment] = useState("BLIK");
  const [shippingPrice, setShippingPrice] = useState(5);
  const { selectedAddress } = useFetchAddresses();
  const user = useSelector((state) => state.user);
  const [lockerId, setLockerId] = useState("");
  const router = useRouter();

  function handleDeliveryMethodChange(value) {
    if (value === "Parcel") {
      setIsInpostSelected(true);
      setIsCourierSelected(false);
      setSelectedDeliveryMethod("Parcel");
      setSelectedDeliveryCompany("InPost");
      setShippingPrice(5);
    } else if (value === "Courier") {
      setIsCourierSelected(true);
      setIsInpostSelected(false);
      setSelectedDeliveryMethod("Courier");
    }
  }

  function handleDeliveryCompanyChange(value) {
    setSelectedDeliveryCompany(value);
    if (value === "FedEx") {
      setShippingPrice(5);
    } else if (value === "DPD") {
      setShippingPrice(15);
    } else if (value === "UPS") {
      setShippingPrice(10);
    }
  }

  function handleSubmitOnClick() {
    dispatch({
      type: "orders/setDeliveryMethod",
      payload: selectedDeliveryMethod,
    });
    dispatch({
      type: "orders/setDeliveryPrice",
      payload: shippingPrice,
    });
    dispatch({
      type: "orders/setPaymentMethod",
      payload: selectedPayment,
    });

    if (selectedDeliveryMethod === "Courier") {
      dispatch({
        type: "orders/setDeliveryCompany",
        payload: selectedDeliveryCompany,
      });
      router.push("/order/summary");
    } else if (selectedDeliveryMethod === "Parcel") {
      dispatch({
        type: "orders/setDeliveryCompany",
        payload: "InPost",
      });
      dispatch({
        type: "orders/setParcelLockerId",
        payload: lockerId,
      });
      router.push("/order/summary");
    }
  }

  function handlePaymentChange(value) {
    setSelectedPayment(value);
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 py-8 items-start justify-center w-full max-w-screen-2xl mx-auto">
      <div className="flex flex-col gap-4 w-full lg:w-2/3 pt-4">
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Delivery Method</CardTitle>
              <CardDescription>Choose your delivery method</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                defaultValue="Courier"
                onValueChange={handleDeliveryMethodChange}
                className="flex flex-col gap-4"
              >
                <RadioButton
                  id="Courier"
                  value="Courier"
                  label="Courier"
                  price="$0"
                  isSelected={selectedDeliveryMethod === "Courier"}
                />
                <RadioButton
                  id="Parcel"
                  value="Parcel"
                  label="InPost Parcel"
                  price="$5"
                  isSelected={selectedDeliveryMethod === "Parcel"}
                />
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
                        value={lockerId}
                        onChange={(e) => setLockerId(e.target.value)}
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
                  <RadioButton
                    id="FedEx"
                    value="FedEx"
                    label="FedEx"
                    price="5$"
                    isSelected={selectedDeliveryCompany === "FedEx"}
                  />
                  <RadioButton
                    id="DPD"
                    value="DPD"
                    label="DPD"
                    price="15$"
                    isSelected={selectedDeliveryCompany === "DPD"}
                  />
                  <RadioButton
                    id="UPS"
                    value="UPS"
                    label="UPS"
                    price="10$"
                    isSelected={selectedDeliveryCompany === "UPS"}
                  />
                </RadioGroup>
              </CardContent>
            </Card>
          )}
          <Card>
            <CardHeader>
              <CardTitle className="flex flex-row items-center justify-between">
                Buyer Details
                <div className="flex justify-end mr-6">
                  <UserEdit user={user} />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-row gap-4 items-center justify-between">
                <UserCard />
              </div>
            </CardContent>
          </Card>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Payment</CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  defaultValue="BLIK"
                  onValueChange={handlePaymentChange}
                  className="flex flex-col gap-4"
                >
                  <RadioButton
                    id="BLIK"
                    value="BLIK"
                    label="BLIK"
                    price="0$"
                    isSelected={selectedPayment === "BLIK"}
                  />
                  <RadioButton
                    id="Credit_Card"
                    value="Credit_Card"
                    label="Credit Card"
                    price="0$"
                    isSelected={selectedPayment === "Credit_Card"}
                  />
                </RadioGroup>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/3 mt-6 lg:mt-0">
        <OrderSummary
          handleSubmitOnClick={handleSubmitOnClick}
          shippingPrice={shippingPrice}
          disabled={!selectedAddress || !user}
        />
      </div>
    </div>
  );
}
