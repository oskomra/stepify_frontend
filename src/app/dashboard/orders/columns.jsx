"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Eye, RefreshCw } from "lucide-react";
import { format } from "date-fns";

const getStatusColor = (status) => {
  switch (status) {
    case "PENDING":
      return "warning";
    case "PROCESSING":
      return "info";
    case "SHIPPED":
      return "secondary";
    case "DELIVERED":
      return "success";
    case "CANCELLED":
      return "destructive";
    default:
      return "outline";
  }
};

export const columns = (onStatusUpdate, onViewDetails) => [
  {
    accessorKey: "id",
    header: "Order ID",
    cell: ({ row }) => <div className="font-medium">#{row.original.id}</div>,
  },
  {
    accessorKey: "userId",
    header: "Customer ID",
    cell: ({ row }) => <div className="font-medium">{row.original.userId}</div>,
  },
  {
    accessorKey: "orderDate",
    header: "Order Date",
    cell: ({ row }) => (
      <div>
        {format(new Date(row.original.orderDate), "MMM d, yyyy")}
        <div className="text-sm text-muted-foreground">
          {format(new Date(row.original.orderDate), "h:mm a")}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={getStatusColor(row.original.status)}>
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "totalPrice",
    header: "Total",
    cell: ({ row }) => (
      <div className="font-medium">
        ${row.original.totalPrice.toFixed(2)}
        <div className="text-sm text-muted-foreground">
          {row.original.quantity} items
        </div>
      </div>
    ),
  },
  {
    accessorKey: "deliveryMethod",
    header: "Delivery",
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.original.deliveryMethod}</div>
        {row.original.deliveryCompany && (
          <div className="text-sm text-muted-foreground">
            {row.original.deliveryCompany}
          </div>
        )}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onViewDetails(order.id)}>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onStatusUpdate(order.id)}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Update Status
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
