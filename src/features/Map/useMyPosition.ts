import { useState, useEffect } from "react";

type Position = {
  lat: number;
  lng: number;
  heading: number | null;
};

type Error = {
  message: string;
};

type UseMyPositionReturnType = {
  position: Position | null;
  loading: boolean;
  error: Error | null;
};

export default function useMyPosition(): UseMyPositionReturnType {
  const [position, setPosition] = useState<Position | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const onChange = ({
    coords: { latitude, longitude, heading },
  }: GeolocationPosition) => {
    setPosition({
      lat: latitude,
      lng: longitude,
      heading,
    });
    setLoading(false);
    setError(null);
  };

  const onError = (error: GeolocationPositionError) => {
    setError({ message: error.message });
    setLoading(false);
  };

  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      setError({ message: "Geolocation is not supported" });
      setLoading(false);
      return;
    }

    const watcher = geo.watchPosition(onChange, onError);
    return () => geo.clearWatch(watcher);
  }, []);

  return { position, loading, error };
}
