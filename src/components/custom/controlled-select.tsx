import { ControllerRenderProps, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ControlledSelectProps<TFieldValues extends FieldValues> {
  control: any;
  name: keyof TFieldValues;
  label: string;
  placeholder?: string;
  options: { label: string; value: string }[];
}

export default function ControlledSelect<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  options,
}: ControlledSelectProps<TFieldValues>) {
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
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent className="">
                <SelectGroup>
                  {options.map((option) => (
                    <SelectItem
                      className=""
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage className="" />
        </FormItem>
      )}
    />
  );
}
