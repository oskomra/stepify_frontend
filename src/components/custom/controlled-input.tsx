import { ControllerRenderProps, FieldValues } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface ControlledInputProps<TFieldValues extends FieldValues> {
  control: any;
  name: keyof TFieldValues;
  label: string;
  placeholder?: string;
  description?: string;
}

export default function ControlledInput<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  description,
}: ControlledInputProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name as string}
      render={({
        field,
      }: {
        field: ControllerRenderProps<TFieldValues, any>;
      }) => (
        <FormItem className="">
          <FormLabel className="">{label}</FormLabel>
          <FormControl>
            <Input
              className=""
              type="text"
              placeholder={placeholder}
              {...field}
            />
          </FormControl>
          {description && (
            <FormDescription className="">{description}</FormDescription>
          )}
          <FormMessage className="" />
        </FormItem>
      )}
    />
  );
}
