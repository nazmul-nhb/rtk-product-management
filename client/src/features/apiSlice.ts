import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
	IProductMutationResponse,
	IProduct,
	IProductsQueryResponse,
	IProductToCreate,
	IProductToUpdate,
} from "../types/interfaces";

// Define the API
export const productsApi = createApi({
	reducerPath: "productsApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://rtk-product-management-server.vercel.app/",
	}),
	endpoints: (builder) => ({
		// get all products
		getAllProducts: builder.query<IProductsQueryResponse, void>({
			query: () => "products",
			providesTags: ["ProductList"], // Provide tag for invalidation
		}),
		// get a single product by id
		getProduct: builder.query<IProduct, string>({
			query: (id) => `products/${id}`,
		}),
		// create a new product
		createProduct: builder.mutation<
			IProductMutationResponse,
			IProductToCreate
		>({
			query: (newProduct) => ({
				url: "products",
				method: "POST",
				body: newProduct,
			}),
			invalidatesTags: ["ProductList"], // Invalidate tag
		}),
		// update a product by id
		updateProduct: builder.mutation<
			IProductMutationResponse,
			IProductToUpdate
		>({
			query: ({ id, updatedProduct }) => ({
				url: `products/${id}`,
				method: "PATCH",
				body: updatedProduct,
			}),
			invalidatesTags: ["ProductList"],
		}),
		deleteProduct: builder.mutation<IProductMutationResponse, string>({
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
