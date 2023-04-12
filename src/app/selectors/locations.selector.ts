import { useCallback } from "react";

import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../store";

import { useAppDispatch } from "../hooks";
import { addLocation, removeLocation } from "../slices/locations.slice";
import { Location, Locations } from "../types";

/* Selectors */
export const getLocations = (state: RootState) => state.locations;
export const selectLocationList = createSelector(
  getLocations,
  (locations) =>
    Object.entries(locations).map(([, location]) => location) as Location[]
);
export const getLocationId = (_: RootState, id: string) => id;
export const selectLocation = () =>
  createSelector(
    [getLocations, getLocationId],
    (locations, id) => locations[id]
  );

/* Hooks */
export const useLocationList = (): Location[] =>
  useSelector(selectLocationList);
export const useLocations = () => useSelector(getLocations);
export const useLocation = (id: string) => {
  const selectLocationById = selectLocation();
  return useSelector((state: RootState) => selectLocationById(state, id));
};

/* Action Hooks */
export const useAddLocation = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (location: Location) => dispatch(addLocation(location)),
    [dispatch]
  );
};
export const useRemoveLocation = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (location: Location) => dispatch(removeLocation(location)),
    [dispatch]
  );
};
