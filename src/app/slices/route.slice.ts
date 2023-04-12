/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Delivery, Route } from "../types";
import { getDeliveryId } from "../utils";

import { route } from "./initial";

const removeFromArray = (arr: any[], item: any) => {
  const idx = arr.indexOf(item);
  if (idx !== -1) arr.splice(idx, 1);
};

export const routeSlice = createSlice({
  name: "route",
  initialState: route as Route, // ids[]
  reducers: {
    addToRoute: (
      state,
      { payload }: PayloadAction<{ delivery: Delivery; index: number }>
    ) => {
      const deliveryId = getDeliveryId(payload.delivery);
      removeFromArray(state, deliveryId);
      state.splice(payload.index, 0, deliveryId);
    },
    addToTopOfRoute: (state, { payload }: PayloadAction<Delivery>) => {
      const deliveryId = getDeliveryId(payload);
      removeFromArray(state, deliveryId);
      state.unshift(deliveryId);
    },
    addToEndOfRoute: (state, { payload }: PayloadAction<Delivery>) => {
      const deliveryId = getDeliveryId(payload);
      removeFromArray(state, deliveryId);
      state.push(deliveryId);
    },
    removeFromRoute: (state, { payload }: PayloadAction<Delivery>) => {
      const deliveryId = getDeliveryId(payload);
      removeFromArray(state, deliveryId);
    },
    reorder: (_state, { payload }: PayloadAction<string[]>) => payload,
  },
});

export const {
  addToRoute,
  removeFromRoute,
  addToTopOfRoute,
  addToEndOfRoute,
  reorder,
} = routeSlice.actions;

export default routeSlice.reducer;
