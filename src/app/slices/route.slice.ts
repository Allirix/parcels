/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Delivery, Route } from "../types";
import { getDeliveryId } from "../utils";

import { route } from "./initial";

export const routeSlice = createSlice({
  name: "route",
  initialState: route as Route, // ids[]
  reducers: {
    addToRoute: (
      state,
      { payload }: PayloadAction<{ delivery: Delivery; index: number }>
    ) => {
      const deliveryId = getDeliveryId(payload.delivery);
      const deleteFromIdx = state.indexOf(deliveryId);
      if (deleteFromIdx !== -1) state.splice(deleteFromIdx, 1);
      state.splice(payload.index, 0, deliveryId);
    },
    removeFromRoute: (state, { payload }: PayloadAction<Delivery>) => {
      const deliveryId = getDeliveryId(payload);

      const deleteFromIdx = state.indexOf(deliveryId);
      if (deleteFromIdx !== -1) state.splice(deleteFromIdx, 1);
    },
    reorder: (_state, { payload }: PayloadAction<string[]>) => payload,
  },
});

export const { addToRoute, removeFromRoute, reorder } = routeSlice.actions;

export default routeSlice.reducer;
