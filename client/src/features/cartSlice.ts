import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState:[] = {
	cart: JSON.parse(localStorage.getItem("cart")) || [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        
    }
})