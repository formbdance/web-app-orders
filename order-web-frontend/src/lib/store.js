import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { localSlice } from "./features/orders/localSlice";
import { rentSlice } from "./features/modals/rentSlice";
import  productsSlice from "./features/products/productsSlice";


const rootReducer = combineReducers({
  locals: localSlice.reducer,
  rentModal: rentSlice.reducer,
  products: productsSlice,
});

export const defaultStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};