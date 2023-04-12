import { useCallback } from "react";

import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../store";

import { useAppDispatch } from "../hooks";
import { addSuburb, removeSuburb } from "../slices/suburbs.slice";

/* Selectors */
export const getSuburbs = (state: RootState) => state.suburbs;
export const selectSuburbList = createSelector(getSuburbs, (suburbs) =>
  Object.keys(suburbs).map((name) => ({ name }))
);
export const getSuburbId = (_: RootState, id: string) => id;
export const selectSuburb = () =>
  createSelector([getSuburbs, getSuburbId], (suburbs, id) => suburbs[id]);

/* Hooks */
export const useSuburbList = () => useSelector(selectSuburbList);
export const useSuburb = (id: string) => {
  const selectSuburbById = selectSuburb();
  return useSelector((state: RootState) => selectSuburbById(state, id));
};

/* Action Hooks */
export const useAddSuburb = () => {
  const dispatch = useAppDispatch();
  return useCallback((name: string) => dispatch(addSuburb(name)), [dispatch]);
};
export const useRemoveSuburb = () => {
  const dispatch = useAppDispatch();
  return useCallback((id: string) => dispatch(removeSuburb(id)), [dispatch]);
};
