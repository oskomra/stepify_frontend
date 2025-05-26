import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

export default function AddressForm({
  defaultValues = {},
  onSubmit,
  onCancel,
  errors,
  register,
  handleSubmit,
  submitText = "Save",
}) {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="street">Street</Label>
        <Input
          id="street"
          placeholder="Street"
          {...register("street")}
          defaultValue={defaultValues.street}
        />
        {errors.street && (
          <p className="text-sm text-red-500">{errors.street.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="city">City</Label>
        <Input
          id="city"
          placeholder="City"
          {...register("city")}
          defaultValue={defaultValues.city}
        />
        {errors.city && (
          <p className="text-sm text-red-500">{errors.city.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="postalCode">Postal code</Label>
        <Input
          id="postalCode"
          placeholder="Postal code"
          {...register("postalCode")}
          defaultValue={defaultValues.postalCode}
        />
        {errors.postalCode && (
          <p className="text-sm text-red-500">{errors.postalCode.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="country">Country</Label>
        <Input
          id="country"
          placeholder="Country"
          {...register("country")}
          defaultValue={defaultValues.country}
        />
        {errors.country && (
          <p className="text-sm text-red-500">{errors.country.message}</p>
        )}
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{submitText}</Button>
      </DialogFooter>
    </form>
  );
}
