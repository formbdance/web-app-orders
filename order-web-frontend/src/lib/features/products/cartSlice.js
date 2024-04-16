import { createSlice } from '@reduxjs/toolkit';
const LOCAL_STORAGE_KEY = 'corsine';

const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		
		products: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [],
	},
	reducers: {
		addItem: (state, action) => {
			const foundItem = state.products.find((item) => item._id === action.payload._id);
			if (foundItem) {
				foundItem.count += 1;
			} else {
				state.products.push(action.payload);
			}

			localStorage.setItem("corsine", JSON.stringify(state.products));
		},
		clearCart: (state) => {
			localStorage.clear()
			state.products = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
		}
	},
});

export const { addItem, clearCart } = cartSlice.actions

export default cartSlice.reducer;