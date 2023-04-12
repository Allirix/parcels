import { useCallback } from "react";

import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { ActionCreators } from "redux-undo";

import { RootState } from "../store";

import { useAppDispatch } from "../hooks";
import {
  addDelivery,
  removeDelivery,
  toggleDeliveredAt,
} from "../slices/deliveries.slice";
import { Delivery, FullDelivery } from "../types";
import { selectAddresses } from "./addresses.selector";

/* Selectors */
export const getDeliveryHistory = (state: RootState) => state.deliveries;

export const getDeliveries = (state: RootState) => state.deliveries.present;
export const selectDeliveries = createSelector(
  [getDeliveries, selectAddresses],
  (deliveries, addresses) => {
    const newDeliveries = {} as Record<string, FullDelivery>;

    Object.entries(deliveries).forEach(([addressKey, delivery]) => {
      newDeliveries[addressKey] = { ...delivery, ...addresses[addressKey] };
    });

    return newDeliveries;
  }
);
export const selectDeliveryList = createSelector(
  [selectDeliveries],
  (deliveries) => Object.values(deliveries)
);

export const getDeliveryId = (_: RootState, id: string) => id;
export const selectDelivery = () =>
  createSelector(
    [selectDeliveries, getDeliveryId],
    (deliveries, id) => deliveries[id]
  );

/* Statistics */

export const selectDeliveryStats = createSelector(
  [selectDeliveryList],
  (deliveryList) => {
    const pickups = deliveryList
      .map(
        (delivery) =>
          delivery.parcels.filter((parcel) => parcel.color === "PICKUP").length
      )
      .reduce((sum, pickup) => sum + pickup, 0);

    const deliveries = deliveryList.length;

    const deliveredDeliveries = deliveryList
      .filter(({ deliveredAt }) => deliveredAt)
      .sort((a, b) => a.deliveredAt! - b.deliveredAt!);

    const deliveredCount = deliveredDeliveries.length;

    let prev = 0;
    const ts = deliveredDeliveries.map(({ deliveredAt }) => {
      if (prev === 0) {
        prev = deliveredAt!;
        return 0;
      }

      const TS = prev - deliveredAt!;

      prev = deliveredAt!;

      return TS;
    });

    return { ts, deliveredCount, deliveries, pickups };
  }
);

/* Hooks */
export const useDeliveryList = () => useSelector(selectDeliveryList);
export const useDeliveries = () => useSelector(selectDeliveries);
export const useDelivery = (id: string) => {
  const selectDeliveryById = selectDelivery();
  return useSelector((state: RootState) => selectDeliveryById(state, id));
};

/* Action Hooks */
export const useAddDelivery = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (delivery: Delivery) => dispatch(addDelivery(delivery)),
    [dispatch]
  );
};
export const useRemoveDelivery = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (delivery: Delivery) => dispatch(removeDelivery(delivery)),
    [dispatch]
  );
};
export const useToggleDeliveredAt = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (delivery: Delivery) => dispatch(toggleDeliveredAt(delivery)),
    [dispatch]
  );
};

export const useTimeTravel = () => {
  const dispatch = useAppDispatch();

  const undo = useCallback(
    () => dispatch({ type: "DELIVERY_UNDO" }),
    [dispatch]
  );
  const redo = useCallback(
    () => dispatch({ type: "DELIVERY_REDO" }),
    [dispatch]
  );
  const clear = useCallback(
    () => dispatch(ActionCreators.clearHistory()),
    [dispatch]
  );

  return { undo, redo, clear };
};
