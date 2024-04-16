import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import * as api from "@/lib/api";

export const getOrders = createAsyncThunk('orders/getOrders', api.getOrders);
export const saveOrder = createAsyncThunk('orders/saveOrder', api.saveOrder);
export const deleteOrder = createAsyncThunk('orders/deleteOrder', api.deleteOrder);


const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: [],
        loadError: false,
        saveStatus: false,
        saveError: false,
        deleteStatus: false,
        deleteError: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getOrders.pending, (state) => {
            state.orders = [];
            state.loadError = false;
        })
        .addCase(getOrders.fulfilled, (state, action) => {
            state.orders = action.payload;
        })
        .addCase(getOrders.rejected, (state, action) => {
            state.loadError = true;
        })
        .addCase(saveOrder.pending, (state) => {
            state.saveError = false;
            state.saveError = false;
        })
        .addCase(saveOrder.fulfilled, (state) => {
            state.saveStatus = true;
        })
        .addCase(saveOrder.rejected, (state) => {
            state.saveError = true;
        })
        .addCase(deleteOrder.pending, (state) => {
            state.deleteError = false;
            state.deleteStatus = false;
        })
        .addCase(deleteOrder.fulfilled, (state, action) => {
            state.deleteError = false;
            state.deleteStatus = true;
        })
        .addCase(deleteOrder.rejected, (state) => {
            state.deleteError = true;
            state.deleteStatus = false;
        })
    }
})

export const regState = (state) => state.orders;


export default ordersSlice.reducer;