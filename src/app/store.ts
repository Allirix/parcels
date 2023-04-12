import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import storage from "localforage";

import undoable from "redux-undo";

import { persistReducer, persistStore } from "redux-persist";

import {
  addresses,
  deliveries,
  history,
  locations,
  position,
  route,
  suburbs,
  shift,
} from "./slices";

const persistConfig = {
  key: "root",
  storage,
  debug: true,
  // serialize: false,
};

export const store = configureStore({
  reducer: persistReducer(
    persistConfig,
    combineReducers({
      suburbs: suburbs,
      locations: locations,
      addresses: addresses,
      deliveries: undoable(deliveries, {
        limit: 5,
        undoType: "DELIVERY_UNDO",
        redoType: "DELIVERY_REDO",
      }),
      route: route,
      history: history,
      position: position,
      shift: shift,
    })
  ),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
