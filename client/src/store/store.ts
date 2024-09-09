import { configureStore } from "@reduxjs/toolkit";

export default function () {
	return configureStore({
		reducer: {},
		middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
	});
}
