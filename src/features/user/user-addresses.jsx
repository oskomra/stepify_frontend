"use client";
import { useSelector } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";
import useFetchAddresses from "@/hooks/useFetchAddresses";
import AddAddress from "../address/address-add";
import DeleteAddress from "../address/address-delete";
import EditAddress from "../address/address-edit";

export default function UserAddresses() {
  const { addresses } = useFetchAddresses();

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-3xl text-neutral-700 font-semibold">
          Shipping addresses
        </h1>
        <AddAddress />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {addresses.map((address) => (
          <Card key={address.id} className="">
            <CardContent>
              <div>
                <p className="text-sm">{address.street}</p>
                <p className="text-sm">{address.city}</p>
                <p className="text-sm">{address.postalCode}</p>
                <div className="flex flex-row justify-between items-center mt-4">
                  <DeleteAddress addressId={address.id} />
                  <EditAddress address={address} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
