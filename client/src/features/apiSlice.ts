import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
	MuteProductResponse,
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
			MuteProductResponse,
			Omit<Product, "_id" | "productId" | "createdAt" | "__v">
		>({
			query: (newProduct) => ({
				url: "products",
				method: "POST",
				body: newProduct,
			}),
			invalidatesTags: ["ProductList"], // Invalidate tag
		}),
		updateProduct: builder.mutation<
			MuteProductResponse,
			{ id: string; updatedProduct: Partial<Product> }
		>({
			query: ({ id, updatedProduct }) => ({
				url: `products/${id}`,
				method: "PATCH",
				body: updatedProduct,
			}),
			invalidatesTags: ["ProductList"],
		}),
		deleteProduct: builder.mutation<MuteProductResponse, string>({
			query: (id) => ({
				url: `products/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["ProductList"],
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
	useUpdateProductMutation,
	useDeleteProductMutation,
} = productsApi;
