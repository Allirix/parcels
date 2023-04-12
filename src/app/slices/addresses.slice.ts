/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Address, Addresses, FullAddress } from "../types";
import { getAddressId } from "../utils";
import { addresses } from "./initial";

export const addressSlice = createSlice({
  name: "addresses",
  initialState: addresses as Addresses,
  reducers: {
    addAddress: (state, action: PayloadAction<Address>) => {
      state[getAddressId(action.payload)] = action.payload;
    },
    removeAddress: (state, action: PayloadAction<FullAddress | Address>) => {
      if (getAddressId(action.payload) in state)
        delete state[getAddressId(action.payload)];
    },
  },
});

export const { addAddress, removeAddress } = addressSlice.actions;

export default addressSlice.reducer;
