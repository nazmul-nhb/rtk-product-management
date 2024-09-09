import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
	CreateProductResponse,
	Product,
	ProductsResponse,
} from "../types/interfaces";

// Define the API
export const productsApi = createApi({
	reducerPath: "productsApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://rtk-product-management-server.vercel.app/",
	}),
	endpoints: (builder) => ({
		getAllProducts: builder.query<ProductsResponse, void>({
			query: () => "products",
			providesTags: ["ProductList"], // Provide tag for invalidation
		}),
		getProduct: builder.query<Product, string>({
			query: (id) => `products/${id}`,
		}),
		createProduct: builder.mutation<
			CreateProductResponse,
			Omit<Product, "_id" | "productId" | "createdAt" | "__v">
		>({
			query: (newProduct) => ({
				url: "products",
				method: "POST",
				body: newProduct,
			}),
			invalidatesTags: ["ProductList"], // Invalidate tag
		}),
	}),
	// Define tags for invalidation
	tagTypes: ["ProductList"],
});

// Export the auto-generated hook
export const {
	useGetAllProductsQuery,
	useGetProductQuery,
	useCreateProductMutation,
} = productsApi;
