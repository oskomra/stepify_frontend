"use client";
import React, { useEffect, useState } from "react";
import DataTable from "./data-table";
import { columns } from "./columns";
import useFetchProducts from "@/hooks/useFetchProducts";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

export default function ProductDashboard() {
  const [data, setData] = useState([]);
  const { products } = useFetchProducts();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    setData(() => {
      return products.map((product) => {
        return {
          id: product.id,
          brandName: product.brandName,
          modelName: product.modelName,
          category: product.category,
        };
      });
    });
  }, [products]);

  async function handleProductDelete(productId) {
    const response = await fetch(
      `http://localhost:8080/products/${productId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    if (response.ok) {
      dispatch({ type: "products/removeProducts", payload: productId });
    } else {
      if (response.status === 404) {
        alert("Product not found");
      }
    }
  }

  async function handleProductEdit(brandName, modelName) {
    const response = await fetch(
      `http://localhost:8080/products/${brandName}/${modelName}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    if (response.ok) {
      const product = await response.json();
      router.push(
        `/dashboard/products/edit/${product.brandName}/${product.modelName}`
      );
    } else {
      if (response.status === 404) {
        alert("Product not found");
      }
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-xl text-center font-bold mb-4">Products</h1>
      <div className="flex justify-center mb-4">
        <Button
          className="bg-blue-500 text-white hover:bg-blue-600 flex justify-center items-center"
          onClick={() => {
            router.push("/dashboard/products/new");
          }}
        >
          Add New Product
        </Button>
      </div>
      <DataTable
        columns={columns(handleProductDelete, handleProductEdit)}
        data={data}
      />
    </div>
  );
}
