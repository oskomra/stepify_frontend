"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Controller } from "react-hook-form";
import * as Yup from "yup";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const promotionSchema = Yup.object({
  name: Yup.string().required("Promotion Name is required"),
  description: Yup.string().required("Description is required"),
  promotionType: Yup.string().required("Promotion Type is required"),
  value: Yup.number()
    .typeError("Value must be a number")
    .required("Value is required"),
  startDate: Yup.date().required("Start Date is required"),
  endDate: Yup.date()
    .min(Yup.ref("startDate"), "End Date must be after Start Date")
    .required("End Date is required"),
  code: Yup.string().required("Code is required"),
  usageLimit: Yup.number()
    .typeError("Usage Limit must be a number")
    .required("Usage Limit is required"),
  usageCount: Yup.number()
    .typeError("Usage Count must be a number")
    .required("Usage Count is required"),
  minimumOrderValue: Yup.number()
    .typeError("Minimum Order Value must be a number")
    .required("Minimum Order Value is required"),
  stackable: Yup.boolean().required("Stackable is required"),
});

export default function PromotionForm() {
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: yupResolver(promotionSchema),
  });

  async function onSubmit(data) {
    const promotionData = {
      name: data.name,
      description: data.description,
      promotionType: data.promotionType,
      value: data.value,
      startDate: data.startDate,
      endDate: data.endDate,
      code: data.code,
      usageLimit: data.usageLimit,
      usageCount: data.usageCount,
      minimumOrderValue: data.minimumOrderValue,
      stackable: data.stackable,
    };

    const response = await fetch("http://localhost:8080/promotions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(promotionData),
    });

    if (response.ok) {
      router.push("/dashboard/promotions");
    } else {
      const errorData = await response.json();
      setError("apiError", { message: errorData.message });
    }
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Add new product</CardTitle>
          <CardDescription>
            Enter the product details below to add a new product to the
            inventory.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 mb-4">
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                <div>
                  <Label htmlFor="name">Promotion Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Promotion Name"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-red-500">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="promotionType">Promotion Type</Label>
                  <Input
                    id="promotionType"
                    type="text"
                    placeholder="PERCENTAGE or FIXED"
                    {...register("promotionType")}
                  />
                  {errors.promotionType && (
                    <p className="text-red-500">
                      {errors.promotionType.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="value">Value</Label>
                  <Input
                    id="value"
                    type="text"
                    placeholder="Value"
                    {...register("value")}
                  />
                  {errors.value && (
                    <p className="text-red-500">{errors.value.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="code">Code</Label>
                  <Input id="code" placeholder="Code" {...register("code")} />
                  {errors.description && (
                    <p className="text-red-500">{errors.code.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Controller
                    control={control}
                    name="startDate"
                    render={({ field }) => (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value
                              ? format(new Date(field.value), "yyyy-MM-dd")
                              : "Select start date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={
                              field.value ? new Date(field.value) : undefined
                            }
                            onSelect={(date) =>
                              field.onChange(
                                date ? date.toISOString().split("T")[0] : null
                              )
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    )}
                  />
                  {errors.startDate && (
                    <p className="text-red-500">{errors.startDate.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Controller
                    control={control}
                    name="endDate"
                    render={({ field }) => (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value
                              ? format(new Date(field.value), "yyyy-MM-dd")
                              : "Select end date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={
                              field.value ? new Date(field.value) : undefined
                            }
                            onSelect={(date) =>
                              field.onChange(
                                date ? date.toISOString().split("T")[0] : null
                              )
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    )}
                  />
                  {errors.endDate && (
                    <p className="text-red-500">{errors.endDate.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="usageLimit">Usage Limit</Label>
                  <Input
                    id="usageLimit"
                    type="text"
                    placeholder="Usage Limit"
                    {...register("usageLimit")}
                  />
                  {errors.usageLimit && (
                    <p className="text-red-500">{errors.usageLimit.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="usageCount">Usage Count</Label>
                  <Input
                    id="usageCount"
                    type="text"
                    placeholder="Usage Count"
                    {...register("usageCount")}
                  />
                  {errors.usageCount && (
                    <p className="text-red-500">{errors.usageCount.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="minimumOrderValue">Minimum Order Value</Label>
                  <Input
                    id="minimumOrderValue"
                    type="text"
                    placeholder="Minimum Order Value"
                    {...register("minimumOrderValue")}
                  />
                  {errors.minimumOrderValue && (
                    <p className="text-red-500">
                      {errors.minimumOrderValue.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="stackable">Stackable</Label>
                  <Input
                    id="stackable"
                    type="text"
                    placeholder="Stackable (true/false)"
                    {...register("stackable")}
                  />
                  {errors.stackable && (
                    <p className="text-red-500">{errors.stackable.message}</p>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Description"
                  rows={4}
                  {...register("description")}
                />
                {errors.description && (
                  <p className="text-sm text-red-500">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>
            <Button type="submit" className="w-full">
              Add Promotion
            </Button>
            {errors.root?.serverError && (
              <p className="mt-4 text-sm text-red-500 text-center">
                {errors.root.serverError.message}
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
