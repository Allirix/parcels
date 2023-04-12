import { MarkerProps } from "@react-google-maps/api";
import { FullDelivery, Route } from "../../app/types";

type Position = {
  lat: number;
  lng: number;
};

export function getCurrentPosition(): Promise<Position> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject({ message: "Geolocation is not supported" });
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ lat: latitude, lng: longitude });
        },
        (error) => {
          reject({ message: error.message });
        }
      );
    }
  });
}

export const icons = {
  pin: "M 185 476 c -17 -7 -43 -28 -58 -45 c -50 -60 -48 -144 8 -254 c 34 -68 103 -167 116 -167 c 4 0 32 37 62 83 c 118 178 126 295 25 370 c -33 25 -113 32 -153 13 z m 105 -116 c 11 -11 20 -29 20 -40 c 0 -26 -34 -60 -60 -60 c -26 0 -60 34 -60 60 c 0 11 9 29 20 40 c 11 11 29 20 40 20 c 11 0 29 -9 40 -20 z",
  dot: "M 10 19 C 14.97 19 19 14.971 19 10 C 19 5.03 14.97 1 10 1 C 5.029 1 1 5.03 1 10 C 1 14.971 5.029 19 10 19 Z",
  G: "M32 2C15.432 2 2 15.432 2 32s13.432 30 30 30s30-13.432 30-30S48.568 2 32 2m13.484 44.508h-4.017l-.609-3.622c-1.168 1.372-2.219 2.339-3.15 2.9c-1.601.979-3.569 1.47-5.905 1.47c-3.845 0-6.995-1.332-9.448-3.993c-2.56-2.676-3.839-6.335-3.839-10.978c0-4.695 1.292-8.459 3.878-11.292c2.585-2.833 6.004-4.249 10.256-4.249c3.688 0 6.65.935 8.888 2.805s3.521 4.203 3.849 6.998h-5.965c-.459-1.981-1.582-3.366-3.365-4.153c-.998-.434-2.107-.649-3.328-.649c-2.336 0-4.255.881-5.758 2.643c-1.502 1.762-2.254 4.41-2.254 7.946c0 3.563.814 6.085 2.441 7.565c1.627 1.479 3.478 2.22 5.551 2.22c2.035 0 3.701-.584 5-1.751c1.3-1.167 2.1-2.696 2.402-4.588h-6.713v-4.843h12.087v15.571z",
  U: "M32 2C15.432 2 2 15.432 2 32s13.432 30 30 30s30-13.432 30-30S48.568 2 32 2m11.644 32.952c0 3.084-.479 5.486-1.434 7.205c-1.783 3.149-5.182 4.725-10.201 4.725c-5.018 0-8.424-1.575-10.219-4.725c-.957-1.719-1.434-4.121-1.434-7.205V17.118h6.16v17.82c0 1.993.236 3.448.707 4.366c.732 1.626 2.328 2.439 4.785 2.439c2.445 0 4.035-.813 4.768-2.439c.471-.918.705-2.373.705-4.366v-17.82h6.162v17.834z",
  K: "M32 2C15.432 2 2 15.432 2 32s13.432 30 30 30s30-13.432 30-30S48.568 2 32 2m6.016 44.508l-8.939-12.666l-2.922 2.961v9.705h-5.963V17.492h5.963v11.955l11.211-11.955h7.836L33.293 29.426l12.518 17.082h-7.795",
  M: "M32 2C15.432 2 2 15.432 2 32s13.432 30 30 30s30-13.432 30-30S48.568 2 32 2m14.035 44.508h-5.65V26.882c0-.564.008-1.355.02-2.372c.014-1.018.02-1.802.02-2.353l-5.498 24.351h-5.893l-5.459-24.351c0 .551.006 1.335.02 2.353c.014 1.017.02 1.808.02 2.372v19.626h-5.65V17.492h8.824l5.281 22.814l5.242-22.814h8.725v29.016z",
};

const defaultMarkerValues: google.maps.Symbol = {
  path: icons.pin,
  fillColor: "rgb(234,67,53)",
  fillOpacity: 0.9,
  scale: 0.1,
  strokeColor: "gold",
  strokeWeight: 0,
  rotation: 180,
};

const UNDELIVERED_MARKER_OFFEST = 250;

const deliveredMarker = () => ({
  anchor: new window.google.maps.Point(10, 0),
  path: icons.dot,
  scale: 0.5,
});

const pickupMarker = () => ({
  anchor: new window.google.maps.Point(UNDELIVERED_MARKER_OFFEST, 0),
  fillColor: "orange",
  labelOrigin: new window.google.maps.Point(250, 325),
});

const routedMarker = () => ({
  anchor: new window.google.maps.Point(UNDELIVERED_MARKER_OFFEST, 0),
  fillColor: "pink",
  labelOrigin: new window.google.maps.Point(250, 325),
});

const defaultMarker = () => ({
  anchor: new window.google.maps.Point(UNDELIVERED_MARKER_OFFEST, 0),
  labelOrigin: new window.google.maps.Point(250, 325),
});

export type MarkerIconType = typeof defaultMarkerValues;

export const getIcon = ({ isDelivered, isPickup, isRouted }) => {
  return {
    ...defaultMarkerValues,
    scaledSize: new google.maps.Size(50, 50),

    ...(isDelivered
      ? deliveredMarker()
      : isPickup
      ? pickupMarker()
      : defaultMarker()),
  };
};

export const getLabel = ({ isDelivered, isPickup, routeIdx }) => {
  if (routeIdx == -1) return undefined as google.maps.MarkerLabel;

  return {
    label: {
      text: routeIdx + 1 + "",
      className: `marker-label${isPickup ? " marker-pickup" : ""}`,
    },
  };
};

export type DeliveryMarker = FullDelivery & {
  icon?: MarkerIconType;
  label?: google.maps.MarkerLabel;
};

export const getBoundedDeliveryMarkers = (
  deliveries: DeliveryMarker[],
  map: google.maps.Map | undefined
): DeliveryMarker[] => {
  if (!map) throw new Error("No map!");
  const bounds = map.getBounds();
  if (!bounds) return [];

  return deliveries.filter(({ position }) => {
    if (!position) return false;
    if (bounds.contains(position)) return true;
  });
};
