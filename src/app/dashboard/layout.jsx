"use client";
import DashboardSidebar from "./dashboard-sidebar";
import { usePathname } from "next/navigation";
import { AdminRoute } from "@/features/auth/ProtectedRoute";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const selectedPage = pathname.split("/dashboard/")[1] || "products";

  return (
    <AdminRoute>
      <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 min-h-screen">
        <div className="flex flex-col w-full md:w-full gap-4 lg:w-1/7">
          <DashboardSidebar selectedPage={selectedPage} />
        </div>
        <div className="w-full lg:w-6/7 lg:pr-10">
          <main>{children}</main>
        </div>
      </div>
    </AdminRoute>
  );
}
