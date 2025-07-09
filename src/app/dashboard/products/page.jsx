"use client";
import React, { useEffect, useState } from "react";
import DataTable from "../../../components/ui/data-table";
import { columns } from "./columns";
import useFetchProducts from "@/hooks/useFetchProducts";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProductDashboard() {
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterBrand, setFilterBrand] = useState("");
  const [filterGender, setFilterGender] = useState("");
  const [bulkPriceChange, setBulkPriceChange] = useState("");
  const [bulkStockChange, setBulkStockChange] = useState("");
  const [isBulkDialogOpen, setIsBulkDialogOpen] = useState(false);
  const { products } = useFetchProducts();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    setData(() => {
      let filteredProducts = products;

      if (filterCategory && filterCategory !== "all") {
        filteredProducts = filteredProducts.filter(
          (product) => product.category === filterCategory
        );
      }

      if (filterBrand && filterBrand !== "all") {
        filteredProducts = filteredProducts.filter(
          (product) => product.brandName === filterBrand
        );
      }

      if (filterGender && filterGender !== "all") {
        filteredProducts = filteredProducts.filter(
          (product) => product.gender === filterGender
        );
      }

      return filteredProducts.map((product) => ({
        id: product.id,
        brandName: product.brandName,
        modelName: product.modelName,
        category: product.category,
        gender: product.gender,
        totalStock: product.colors.reduce(
          (sum, color) =>
            sum +
            color.sizes.reduce((sizeSum, size) => sizeSum + size.stock, 0),
          0
        ),
        lowestPrice: Math.min(...product.colors.map((color) => color.price)),
        highestPrice: Math.max(...product.colors.map((color) => color.price)),
      }));
    });
  }, [products, filterCategory, filterBrand, filterGender]);

  const uniqueCategories = [...new Set(products.map((p) => p.category))];
  const uniqueBrands = [...new Set(products.map((p) => p.brandName))];
  const uniqueGenders = [...new Set(products.map((p) => p.gender))];

  async function handleProductDelete(productId) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`,
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
      `${process.env.NEXT_PUBLIC_API_URL}/products/${brandName}/${modelName}`,
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
      <h1 className="text-3xl text-center font-bold mb-4">Products</h1>

      <div className="flex flex-wrap mb-6 justify-center">
        <div className="flex min-w-[200px]">
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {uniqueCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex min-w-[200px]">
          <Select value={filterBrand} onValueChange={setFilterBrand}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by brand" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Brands</SelectItem>
              {uniqueBrands.map((brand) => (
                <SelectItem key={brand} value={brand}>
                  {brand}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex min-w-[200px]">
          <Select value={filterGender} onValueChange={setFilterGender}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Genders</SelectItem>
              {uniqueGenders.map((gender) => (
                <SelectItem key={gender} value={gender}>
                  {gender}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <DataTable
        columns={columns(handleProductDelete, handleProductEdit)}
        data={data}
        filterColumn="modelName"
        filterPlaceholder="Search by model name"
        onRowSelectionChange={setSelectedRows}
      />
    </div>
  );
}
