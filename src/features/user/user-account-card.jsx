"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import UserCard from "./user-card";
import UserEdit from "./user-edit";
import { useSelector } from "react-redux";

export default function UserAccountCard() {
  const user = useSelector((state) => state.user);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-row items-center justify-between">
          Your Details
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
  );
}
