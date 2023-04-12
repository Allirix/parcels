import { useCallback } from "react";

import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import { RootState } from "../store";

import { useAppDispatch } from "../hooks";

import { Delivery } from "../types";
import { selectDeliveries } from "./deliveries.selector";
import { addToRoute, removeFromRoute } from "../slices/route.slice";

/* Selectors */
export const getRoute = (state: RootState) => state.route;

export const selectRouteList = createSelector(
  [getRoute, selectDeliveries],
  (routeRefs, deliveries) =>
    routeRefs.map((addressKey) => deliveries[addressKey])
);

/* Hooks */
export const useRouteList = () => useSelector(selectRouteList);
export const useRoute = () => useSelector(getRoute);

/* Action Hooks */
export const useAddToRoute = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (delivery: Delivery, index: number) =>
      dispatch(addToRoute({ delivery, index })),
    [dispatch]
  );
};
export const useRemoveFromRoute = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (delivery: Delivery) => dispatch(removeFromRoute(delivery)),
    [dispatch]
  );
};
