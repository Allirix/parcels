/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { MarkerF, MarkerProps } from "@react-google-maps/api";
import { useDeliveryList } from "../../app/selectors/deliveries.selector";
import { useEffect, useState, useMemo } from "react";
import { addMarkerProps, getBoundedDeliveryMarkers } from "./utils";

import { debounce } from "lodash";
import { useRoute } from "../../app/selectors/route.selector";
import { route } from "../../app/slices/initial/index";

type DeliveryMarkersProps = {
  map: google.maps.Map;
};

export default function DeliveryMarkers({ map }: DeliveryMarkersProps) {
  const deliveries = useDeliveryList();

  const route = useRoute();

  const deliveryMarkers = useMemo(
    () => deliveries.map(addMarkerProps(route)),
    [deliveries, route]
  );

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
  }, [deliveryMarkers, map, route]);

  return (
    <>
      {deliveriesInBounds.map((deliveryMarker) => (
        <MarkerF
          onMouseDown={console.log}
          onDrag={console.log}
          key={deliveryMarker.addressId}
          {...{ ...(deliveryMarker as MarkerProps) }}
        />
      ))}
    </>
  );
}
