/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Deliveries, Delivery } from "../types";
import { getDeliveryId } from "../utils";
import { deliveries } from "./initial";

/**
 * Deletes delivered or undelivered deliveries from the state, based on the value of their 'deliveredAt' property.
 *
 * @param {boolean} deliveredAtEquals - If true, delivered deliveries are deleted; if false, undelivered deliveries are deleted.
 * @param {Object} state - The current state of deliveries.
 * @returns {void} mutates the input, assumes input state uses immer, or mutations are okay
 */
export const endShiftReducer =
  (deliveredAtEquals: boolean) =>
  (state: Deliveries): void => {
    Object.entries(state).forEach(([key, delivery]) => {
      // If 'deliveredAtEquals' is true and 'delivery.deliveredAt' is also true, or
      // if 'deliveredAtEquals' is false and 'delivery.deliveredAt' is false, then delete the delivery from the state.
      if (deliveredAtEquals === !!delivery.deliveredAt) {
        delete state[key];
      }
    });
  };

export const deliverySlice = createSlice({
  name: "deliveries",
  initialState: deliveries as Deliveries,
  reducers: {
    addDelivery: (state, action: PayloadAction<Delivery>) => {
      state[getDeliveryId(action.payload)] = action.payload;
    },
    removeDelivery: (state, action: PayloadAction<Delivery>) => {
      if (getDeliveryId(action.payload) in state)
        delete state[getDeliveryId(action.payload)];
    },
    endShift: endShiftReducer(true),
    toggleDeliveredAt: (state, { payload }: PayloadAction<Delivery>) => {
      state[getDeliveryId(payload)].deliveredAt = payload.deliveredAt
        ? undefined
        : Date.now();
    },
  },
});

export const { addDelivery, removeDelivery, endShift, toggleDeliveredAt } =
  deliverySlice.actions;

export default deliverySlice.reducer;
