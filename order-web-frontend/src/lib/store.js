import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { localSlice } from "./features/orders/localSlice";
import { rentSlice } from "./features/modals/rentSlice";
import  productsSlice from "./features/products/productsSlice";
import ordersSlice from "./features/orders/orderSlice";
import cartSlice from "./features/products/cartSlice";


const rootReducer = combineReducers({
  locals: localSlice.reducer,
  rentModal: rentSlice.reducer,
  products: productsSlice,
  cart: cartSlice,
  orders: ordersSlice,
});

export const defaultStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};