import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductsResponse } from "../types/interfaces";

// Define the API
export const productsApi = createApi({
	reducerPath: "productsApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://rtk-product-management-server.vercel.app/",
	}),
	endpoints: (builder) => ({
		getAllProducts: builder.query<ProductsResponse, void>({
			query: () => "products",
		}),
	}),
});

// Export the auto-generated hook
export const { useGetAllProductsQuery } = productsApi;
