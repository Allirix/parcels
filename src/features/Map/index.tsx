import { Suspense } from "react";
import Loading from "../../components/Loading";
import MapContainer from "./MapContainer";
import { useJsApiLoader } from "@react-google-maps/api";
import DeliveryRoute from "./DeliveryRoute";

export default function Map() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_KEY,
    libraries: ["geometry", "drawing"],
  });
  return (
    <Suspense fallback={<Loading />}>
      <MapContainer isLoaded={isLoaded} />
      <DeliveryRoute />
    </Suspense>
  );
}
