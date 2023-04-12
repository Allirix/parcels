import { useDelivery } from "../../app/selectors/deliveries.selector";
import { useEffect } from "react";
import { Delivery, FullDelivery, Parcel } from "../../app/types";

export default function AddNotes({
  updateDelivery,
  delivery,
}: {
  updateDelivery: (key: string, value: string | Parcel[]) => void;
  delivery: Delivery;
}) {
  const existingDelivery =
    useDelivery(delivery.addressId) || ({} as FullDelivery);

  useEffect(() => {
    if (existingDelivery.notes === "" && delivery.notes) {
      updateDelivery("notes", existingDelivery.notes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <textarea
      className="w-full px-3 py-2 text-gray-800 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-600"
      placeholder="Add notes here"
      rows={4}
      value={delivery.notes}
      onChange={({ target }) => updateDelivery("notes", target.value)}
    ></textarea>
  );
}
