import { MarkerF } from "@react-google-maps/api";
import useMyPosition from "./useMyPosition";

const currentPositionIcon = (heading: number | null) => ({
  path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
  fillColor: "blue",
  fillOpacity: 1,
  scale: 5,
  strokeWeight: 2,
  strokeColor: "white",
  anchor: window.google?.maps && new window.google.maps.Point(0, 2.5),
  rotation: heading,
});

export default function MyPositionMarker() {
  const { position, loading, error } = useMyPosition();

  if (error) console.error(error);
  if (loading || error) return null;

  return position ? (
    <MarkerF icon={currentPositionIcon(position.heading)} position={position} />
  ) : null;
}
