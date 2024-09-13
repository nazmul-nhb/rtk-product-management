import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
	IPMutationResponse,
	IProductResponse,
	IPQueryResponse,
	IProductToCreate,
	IProductToUpdate,
} from "../types/interfaces";

const baseUrl = "https://rtk-product-management-server.vercel.app/";

const baseQuery = fetchBaseQuery({ baseUrl });

const url = "products";

// Define the API
export const productsApi = createApi({
	reducerPath: "productsApi",
	baseQuery,
	tagTypes: ["ProductList", "Product"],
	endpoints: (builder) => ({
		// get all products
		getAllProducts: builder.query<IPQueryResponse, void>({
			query: () => url,
			providesTags: ["ProductList"],
		}),
		// get a single product by id
		getProduct: builder.query<IProductResponse, string>({
			query: (id) => `products/${id}`,
			providesTags: ["Product"],
		}),
		// create a new product
		createProduct: builder.mutation<IPMutationResponse, IProductToCreate>({
			query: (newProduct) => ({
				url,
				method: "POST",
				body: newProduct,
			}),
			invalidatesTags: ["ProductList"],
		}),
		// update a product by id
		updateProduct: builder.mutation<IPMutationResponse, IProductToUpdate>({
			query: ({ id, updatedProduct }) => ({
				url: `${url}/${id}`,
				method: "PATCH",
				body: updatedProduct,
			}),
			invalidatesTags: ["ProductList", "Product"],
		}),
		// delete a product by id
		deleteProduct: builder.mutation<IPMutationResponse, string>({
			query: (id) => ({
				url: `${url}/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["ProductList"],
		}),
	}),
});

export const {
	useGetAllProductsQuery,
	useGetProductQuery,
	useCreateProductMutation,
	useUpdateProductMutation,
	useDeleteProductMutation,
} = productsApi;
