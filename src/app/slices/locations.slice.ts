/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Location, Locations } from "../types";
import { getLocationId } from "../utils";
import { locations } from "./initial";

export const locationsSlice = createSlice({
  name: "locations",
  initialState: locations as Locations,
  reducers: {
    addLocation: (state, action: PayloadAction<Location>) => {
      state[getLocationId(action.payload)] = action.payload;
    },
    removeLocation: (state, action: PayloadAction<Location>) => {
      if (getLocationId(action.payload) in state)
        delete state[getLocationId(action.payload)];
    },
  },
});

export const { addLocation, removeLocation } = locationsSlice.actions;

export default locationsSlice.reducer;
