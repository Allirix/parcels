import { useDeliveryList } from "../../app/selectors/deliveries.selector";
import { FullDelivery } from "../../app/types";
import Delivery from "./Delivery";

type DeliveryListProps = {
  sorter?: (a: FullDelivery, b: FullDelivery) => number;
  length?: number;
};

const sorterDefault = (a: FullDelivery, b: FullDelivery) =>
  a.name.localeCompare(b.name);

export default function DeliveryList({ sorter, length }: DeliveryListProps) {
  const deliveryList = useDeliveryList();

  return (
    <div className="flex flex-col gap-4 p-4">
      {deliveryList
        .sort(sorterDefault ?? sorter)
        .slice(0, length ?? 20)
        .map((delivery) => (
          <Delivery delivery={delivery} key={delivery.addressId} />
        ))}
    </div>
  );
}
