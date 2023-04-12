/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { Shift } from "../types";

export const deliverySlice = createSlice({
  name: "deliveries",
  initialState: { breakMs: 0 } as Shift,
  reducers: {
    toggleShift: (state) => {
      if (state.endedAt && !state.startedAt) delete state.endedAt;

      if (!state.startedAt) state.startedAt = Date.now();
      else if (!state.pauseStartTime) state.pauseStartTime = Date.now();
      else if (state.endedAt) delete state.endedAt;
      else if (state.pauseStartTime) {
        state.breakMs += Date.now() - state.pauseStartTime;
        delete state.pauseStartTime;
      }
    },
    endShift: () => ({ breakMs: 0 } as Shift),
  },
});

export const { toggleShift, endShift } = deliverySlice.actions;

export default deliverySlice.reducer;
