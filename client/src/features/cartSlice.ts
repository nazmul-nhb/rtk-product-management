import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { ICartState } from "../types/interfaces";

const cartKey = "rtk-products";

const initialState: ICartState = {
	cart: JSON.parse(localStorage.getItem(cartKey) || "[]"),
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<string>) => {
			const productId = action.payload;
			if (!state.cart.includes(productId)) {
				state.cart.push(productId);
				localStorage.setItem(cartKey, JSON.stringify(state.cart));
				toast.success("Added to Cart!");
			} else {
				toast.error("Already Exists in Cart!");
			}
		},
		loadCartData: (state) => {
			state.cart = JSON.parse(localStorage.getItem(cartKey) || "[]");
		},
		removeFromCart: (state, action: PayloadAction<string>) => {
			const productId = action.payload;
			state.cart = state.cart.filter((id) => id !== productId);
			localStorage.setItem(cartKey, JSON.stringify(state.cart));
			toast.success("Removed from Cart!");
		},
	},
});

export const { addToCart, loadCartData, removeFromCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
