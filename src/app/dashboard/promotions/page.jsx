"use client";
import React, { useEffect, useState } from "react";
import DataTable from "../../../components/ui/data-table";
import { columns } from "./columns";
import useFetchPromotions from "@/hooks/useFetchPromotions";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

export default function PromotionDashboard() {
  const [data, setData] = useState([]);
  const { promotions } = useFetchPromotions();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    setData(() => {
      return promotions.map((promotion) => {
        return {
          id: promotion.id,
          name: promotion.name,
          promotionType: promotion.promotionType,
          value: promotion.value,
          active: promotion.active,
          startDate: promotion.startDate,
          endDate: promotion.endDate,
          usageLimit: promotion.usageLimit,
          usageCount: promotion.usageCount,
        };
      });
    });
  }, [promotions]);

  async function handlePromotionDelete(promotionId) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/promotions/${promotionId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    if (response.ok) {
      dispatch({ type: "promotions/removePromotions", payload: promotionId });
    } else {
      if (response.status === 404) {
        alert("Promotion not found");
      }
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl text-center font-bold mb-4">Promotions</h1>
      <div className="flex justify-center mb-4">
        <Button
          className="flex justify-center items-center"
          onClick={() => {
            router.push("/dashboard/promotions/new");
          }}
          variant="outline"
        >
          Add New Promotion
        </Button>
      </div>
      <DataTable
        columns={columns(handlePromotionDelete)}
        data={data}
        filterColumn="name"
        filterPlaceholder="Search by name"
      />
    </div>
  );
}
