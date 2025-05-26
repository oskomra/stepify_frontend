import { Card, CardContent } from "@/components/ui/card";

export default function AddressCard({ address, isSelected, onSelect }) {
  return (
    <div>
      <h3 className="text-lg font-semibold">{address?.street}</h3>
      <p>
        {address?.city}, {address?.postalCode}
      </p>
      <p>{address?.country}</p>
    </div>
  );
}
