import { useRouteList } from "../../app/selectors/route.selector";
import { FullDelivery } from "../../app/types";

const DeliveryRouteItem = ({ item }: { item: FullDelivery }) => {
  return <div>{item.addressId}</div>;
};

export default function DeliveryRoute() {
  const route = useRouteList();
  return (
    <div>
      {route.map((item, i) => (
        <DeliveryRouteItem key={i} item={item} />
      ))}
    </div>
  );
}
