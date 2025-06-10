"use client";
import { useState, useEffect } from "react";
import {
  Package,
  ShoppingCart,
  Users,
  LayoutDashboard,
  TagIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    key: "products",
    label: "Products",
    href: "/dashboard/products",
    icon: <Package className="w-5 h-5 mr-3" />,
  },
  {
    key: "orders",
    label: "Orders",
    href: "/dashboard/orders",
    icon: <ShoppingCart className="w-5 h-5 mr-3" />,
  },
  {
    key: "users",
    label: "Users",
    href: "/dashboard/users",
    icon: <Users className="w-5 h-5 mr-3" />,
  },
  {
    key: "promotions",
    label: "Promotions",
    href: "/dashboard/promotions",
    icon: <TagIcon className="w-5 h-5 mr-3" />,
  },
];

export default function DashboardSidebar({ selectedPage = "products" }) {
  const [selected, setSelected] = useState(selectedPage);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/dashboard") {
      setSelected("dashboard");
    } else {
      setSelected(selectedPage);
    }
  }, [selectedPage, pathname]);

  const isDashboardSelected = selected === "dashboard";

  return (
    <aside className="flex flex-col min-h-full bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 text-white lg:border-r border-neutral-700 shadow-lg sticky top-0 w-full">
      <Link
        href="/dashboard"
        className={`group relative flex items-center gap-3 px-6 py-6 border-b border-neutral-700 mb-2 transition-colors
          ${isDashboardSelected ? "bg-neutral-700" : "hover:bg-neutral-700"}`}
      >
        <LayoutDashboard className="w-7 h-7 text-primary bg-neutral-300" />
        <span className="text-xl font-bold tracking-tight">Dashboard</span>
        {isDashboardSelected && (
          <span className="absolute left-0 top-0 h-full w-1 bg-primary rounded-r-lg" />
        )}
      </Link>
      <nav className="flex flex-col gap-1 px-2 py-2">
        {links.map((link) => (
          <a
            key={link.key}
            href={link.href}
            className={`group relative flex items-center rounded-lg px-4 py-3 text-base font-medium transition-all duration-150 outline-none cursor-pointer
              ${
                selected === link.key
                  ? "bg-neutral-700 text-white shadow"
                  : "hover:bg-neutral-700 hover:text-white"
              }
            `}
            onClick={() => setSelected(link.key)}
          >
            {link.icon}
            <span>{link.label}</span>
            {selected === link.key && (
              <span className="absolute left-0 top-0 h-full w-1 bg-primary rounded-r-lg" />
            )}
          </a>
        ))}
      </nav>
    </aside>
  );
}
