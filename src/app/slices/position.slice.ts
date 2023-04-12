/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialPosition = {
  data: {
    latitude: null as number | null,
    longitude: null as number | null,
    altitude: null as number | null,
    accuracy: 0 as number,
    altitudeAccuracy: 0 as number | null,
    heading: null as number | null,
    speed: null as number | null,
  },
  error: "",
};

export const positionSlice = createSlice({
  name: "position",
  initialState: initialPosition,
  reducers: {
    setPosition: (
      state,
      { payload }: PayloadAction<GeolocationCoordinates>
    ) => {
      state.data = payload;
      state.error = "";
    },
    setPositionError: (state, action: PayloadAction<string>) => {
      state.data = initialPosition.data;
      state.error = action.payload;
    },
  },
});

export const { setPosition, setPositionError } = positionSlice.actions;

export default positionSlice.reducer;
