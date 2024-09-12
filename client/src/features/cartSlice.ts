import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { CartItem, CartState } from "../types/interfaces";

const cartKey = "rtk-products";

const initialState: CartState = {
	cart: JSON.parse(localStorage.getItem(cartKey) || "[]") as CartItem[],
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action) => {
			const productId = action.payload;
			if (!state.cart.includes(productId)) {
				state.cart.push(productId);
				localStorage.setItem(cartKey, JSON.stringify(state.cart));
				toast.success("Added to Cart!");
			} else {
				toast.error(`Already Exists in Cart!`);
			}
		},
	},
});

export const { addToCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
