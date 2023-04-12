import { GoogleMap } from "@react-google-maps/api";
import MyPositionMarker from "./MyPositionMarker";
import { useEffect, useState } from "react";
import { getCurrentPosition } from "./utils";
import DeliveryMarkers from "./DeliveryMarkers";
import { mapOptions } from "./map-options";

const defaultCenter = { lat: -27.445633292043752, lng: 153.06612747998287 };

export default function MapContainer({ isLoaded }: { isLoaded: boolean }) {
  const [center, setCenter] = useState(defaultCenter);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  if (!isLoaded) throw new Promise((resolve) => setTimeout(resolve, 300));

  useEffect(() => {
    getCurrentPosition().then((position) => setCenter(position));
  }, []);

  return (
    isLoaded && (
      <GoogleMap
        center={center}
        zoom={14}
        mapContainerStyle={{
          height: "calc(100vh - 128px)",
          width: "calc(100vw)",
        }}
        options={mapOptions}
        clickableIcons={false}
        id="map"
        onLoad={setMap}
      >
        <MyPositionMarker />
        {map && <DeliveryMarkers map={map} />}
      </GoogleMap>
    )
  );
}
