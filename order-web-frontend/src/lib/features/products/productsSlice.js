import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import * as api from "@/lib/api";

export const getProducts = createAsyncThunk('products/getProducts', api.getProduct);
export const saveProduct = createAsyncThunk('products/saveProduct', api.saveProduct);


const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        loadError: false,
        saveStatus: false,
        saveError: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getProducts.pending, (state) => {
            state.products = [];
            loadError = false;
        })
        .addCase(getProducts.fulfilled, (state, action) => {
            state.products = action.payload;
        })
        .addCase(getProducts.rejected, (state) => {
            state.loadError = true;
        })
        .addCase(saveProduct.pending, (state) => {
            state.saveError = false;
            state.saveError = false;
        })
        .addCase(saveProduct.fulfilled, (state) => {
            state.saveStatus = true;
        })
        .addCase(saveProduct.rejected, (state) => {
            state.saveError = true;
        })
    }
})

export const regState = (state) => state.products;


export default productsSlice.reducer;