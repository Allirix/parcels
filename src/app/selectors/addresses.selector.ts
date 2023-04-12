import { useCallback } from "react";

import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../store";

import { useAppDispatch } from "../hooks";
import { addAddress, removeAddress } from "../slices/addresses.slice";
import { Address, FullAddress } from "../types";
import { getLocations } from "./locations.selector";

/* Selectors */
export const getAddresses = (state: RootState) => state.addresses;
export const selectAddresses = createSelector(
  [getAddresses, getLocations],
  (addresses, locations) => {
    const newAddresses = {} as Record<string, FullAddress>;

    Object.entries(addresses).forEach(([addressKey, address]) => {
      newAddresses[addressKey] = {
        ...address,
        ...locations[address.locationId],
      };
    });

    return newAddresses;
  }
);
export const selectAddressList = createSelector(
  [selectAddresses],
  (addresses) => Object.values(addresses)
);

export const getAddressId = (_: RootState, id: string) => id;
export const selectAddress = () =>
  createSelector(
    [getAddresses, getAddressId],
    (addresses, id) => addresses[id]
  );

/* Hooks */
export const useAddressList = () => useSelector(selectAddressList);
export const useAddresses = () => useSelector(getAddresses);
export const useAddress = (id: string) => {
  const selectAddressById = selectAddress();
  return useSelector((state: RootState) => selectAddressById(state, id));
};

/* Action Hooks */
export const useAddAddress = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (address: Address) => dispatch(addAddress(address)),
    [dispatch]
  );
};
export const useRemoveAddress = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (address: Address) => dispatch(removeAddress(address)),
    [dispatch]
  );
};
