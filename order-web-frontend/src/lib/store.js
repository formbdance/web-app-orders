import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { ordersSlice } from "./features/orders/ordersSlice";
import { rentSlice } from "./features/modals/rentSlice";


const rootReducer = combineReducers({
  orders: ordersSlice.reducer,
  rentModal: rentSlice.reducer,
});

export const defaultStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};