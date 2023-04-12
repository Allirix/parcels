import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { RootState } from "../store";
import { setPosition, setPositionError } from "../slices/position.slice";

export const getPosition = (state: RootState) => state.position;

export const useSyncPosition = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;

    const handlePosition = (position: any) => {
      if (isMounted) dispatch(setPosition(position));
    };

    const handleError = (error: GeolocationPositionError) => {
      if (isMounted) dispatch(setPositionError(error.message));
    };

    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        handlePosition,
        handleError
      );

      return () => {
        isMounted = false;
        navigator.geolocation.clearWatch(watchId);
      };
    }
    dispatch(setPositionError("Geolocation is not supported by this browser."));
    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  return null;
};
