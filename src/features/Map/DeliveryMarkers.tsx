/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { MarkerF, MarkerProps } from "@react-google-maps/api";
import { useDeliveryList } from "../../app/selectors/deliveries.selector";
import { useEffect, useState, useMemo } from "react";
import { getBoundedDeliveryMarkers, getIcon, getLabel } from "./utils";

import debounce from "lodash/debounce";
import { useRoute, useRouteActions } from "../../app/selectors/route.selector";
import { FullDelivery } from "../../app/types";

type DeliveryMarkersProps = {
  map: google.maps.Map;
};

function DeliveryMarkers({ map }: DeliveryMarkersProps) {
  const deliveries = useDeliveryList();

  const route = useRoute();

  const actions = useRouteActions();

  const deliveryMarkers = useMemo(() => {
    return deliveries.map((delivery: FullDelivery) => {
      const isDelivered = !!delivery.deliveredAt;
      const isPickup = delivery.parcels.some((p) => p.type === "PICKUP");
      const routeIdx = route.findIndex(
        (addressId) => addressId === delivery.addressId
      );

      return {
        ...delivery,
        icon: getIcon({
          isDelivered,
          isPickup,
          isRouted: routeIdx > -1,
        }),
        onClick: () => actions.addToTop(delivery),
        onDblClick: () => actions.addToEnd(delivery),

        ...(routeIdx === -1
          ? {}
          : getLabel({ isDelivered, isPickup, routeIdx })),
      };
    });
  }, [actions, deliveries, route]);

  const [deliveriesInBounds, setDeliveriesInBounds] = useState(() =>
    getBoundedDeliveryMarkers(deliveryMarkers, map)
  );

  useEffect(() => {
    const filterOutOfBounds = () =>
      setDeliveriesInBounds(getBoundedDeliveryMarkers(deliveryMarkers, map));

    const zoomListener = google.maps.event.addListener(
      map,
      "zoom_changed",
      debounce(filterOutOfBounds, 500)
    );

    const panListener = google.maps.event.addListener(
      map,
      "dragend",
      filterOutOfBounds
    );

    return () => {
      google.maps.event.removeListener(zoomListener);
      google.maps.event.removeListener(panListener);
    };
  }, [deliveryMarkers, map]);

  return (
    <>
      {deliveriesInBounds.map((marker) => (
        <MarkerF key={marker.addressId} {...{ ...(marker as MarkerProps) }} />
      ))}
    </>
  );
}

export default DeliveryMarkers;
