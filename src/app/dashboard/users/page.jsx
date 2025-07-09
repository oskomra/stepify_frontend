"use client";
import React, { useEffect, useState } from "react";
import DataTable from "@/components/ui/data-table";
import { columns } from "./columns";

export default function UsersDashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!response.ok) throw new Error("Failed to fetch users");
        const users = await response.json();
        setData(users);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  async function handleDeleteUser(userId) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/${userId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (!response.ok) throw new Error("Failed to delete user");
      setData((prevData) => prevData.filter((user) => user.id !== userId));
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl text-center font-bold mb-4">Users</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <DataTable
        columns={columns(handleDeleteUser)}
        data={data}
        filterColumn="email"
        filterPlaceholder="Search by email"
        showPagination={true}
        showColumnVisibility={true}
        showSelectedCount={true}
      />
      {loading && (
        <div className="text-center text-muted-foreground mt-4">
          Loading users...
        </div>
      )}
    </div>
  );
}
