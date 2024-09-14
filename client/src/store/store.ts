import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "../features/apiSlice";
import { cartReducer } from "../features/cartSlice";

// export default function () {
// 	return configureStore({
// 		reducer: {
// 			cart: cartReducer,
// 			[productsApi.reducerPath]: productsApi.reducer,
// 		},
// 		middleware: (getDefaultMiddleware) =>
// 			getDefaultMiddleware().concat(productsApi.middleware),
// 	});
// }

const store = configureStore({
	reducer: {
		cart: cartReducer,
		[productsApi.reducerPath]: productsApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(productsApi.middleware),
});

export default store;

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
