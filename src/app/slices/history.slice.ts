/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Delivery, History, Shift } from "../types";
import { getShiftId } from "../utils";

export const historySlice = createSlice({
  name: "histroy",
  initialState: {} as History,
  reducers: {
    endShift: (
      state,
      {
        payload,
      }: PayloadAction<{ deliveries: Record<string, Delivery>; shift: Shift }>
    ) => {
      const shiftId = getShiftId(payload.shift);

      state[shiftId] = { ...state[shiftId], ...payload.deliveries };
    },
  },
});

export const { endShift } = historySlice.actions;

export default historySlice.reducer;
