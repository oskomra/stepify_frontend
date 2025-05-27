export default function AddressCard({ address }) {
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
