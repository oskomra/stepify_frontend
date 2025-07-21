"use client";
import UserSidebar from "./user-sidebar";
import { usePathname } from "next/navigation";
import { useAuth } from "@/provider/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UserLayout({ children }) {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const selectedPage = pathname.split("/")[1] || "account";

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 py-8 items-start justify-center w-full max-w-screen-2xl mx-auto">
      <div className="flex flex-col w-full md:w-full gap-4 lg:w-1/4">
        <UserSidebar selectedPage={selectedPage} />
      </div>
      <div className="w-full lg:w-3/4">
        <main>{children}</main>
      </div>
    </div>
  );
}
