import { useCallback } from "react";

import { useSelector } from "react-redux";
import { RootState } from "../store";

import { useAppDispatch } from "../hooks";
import {
  endShift as endShift_deliveries,
  endShiftReducer,
} from "../slices/deliveries.slice";
import { endShift as endShift_history } from "../slices/history.slice";
import {
  endShift as endShift_shift,
  toggleShift as toggleShiftAction,
} from "../slices/shift.slice";
import { useDeliveries } from "./deliveries.selector";

/* Selectors */
export const getShift = (state: RootState) => state.shift;

/* Hooks */
// export const useShift = () => useSelector(getShift);

/* Action Hooks */
export const useToggleShift = () => {
  const dispatch = useAppDispatch();
  return useCallback(() => dispatch(toggleShiftAction()), [dispatch]);
};
export const useShift = () => {
  const dispatch = useAppDispatch();

  const shift = useSelector(getShift);
  const deliveries = useDeliveries();
  const endShift = useCallback(() => {
    const deliveredDeliveries = { ...deliveries };
    endShiftReducer(false)(deliveredDeliveries); // mutates deliveredDeliveries

    // TODO: Implement in a thunk
    dispatch(endShift_shift());
    dispatch(endShift_deliveries());
    dispatch(endShift_history({ deliveries: deliveredDeliveries, shift }));
  }, [dispatch, deliveries, shift]);

  const toggleShift = useCallback(
    () => dispatch(toggleShiftAction()),
    [dispatch]
  );

  return { shift, endShift, toggleShift };
};
