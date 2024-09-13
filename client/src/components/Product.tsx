import React from "react";
import { IProduct } from "../types/interfaces";
import toast from "react-hot-toast";
import {
	useDeleteProductMutation,
	useUpdateProductMutation,
} from "../features/apiSlice";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";

interface ProductProps {
	product: IProduct;
}

const updatedProduct = {
	title: "Updated",
};

const Product: React.FC<ProductProps> = ({ product }) => {
	const { _id, title, productImage, productId, price } = product;

	const [updateProduct] = useUpdateProductMutation();
	const [deleteProduct] = useDeleteProductMutation();
	const dispatch = useDispatch();

	const handleUpdateProduct = async (id: string) => {
		try {
			await toast.promise(
				updateProduct({ id, updatedProduct }).unwrap(),
				{
					loading: "Updating Product...",
					success: (result) => result.message,
					error: (error) =>
						error.message || "Error Updating Product!",
				}
			);
		} catch (err) {
			if (err instanceof Error) {
				toast.error(err.message || "Unknown Error!");
			}
			toast.error("Unknown Error!");
		}
	};

	const handleDeleteProduct = async (id: string) => {
		try {
			await toast.promise(deleteProduct(id).unwrap(), {
				loading: "Deleting Product...",
				success: (result) => result.message,
				error: (error) => error.message || "Error Deleting Product!",
			});
		} catch (err) {
			if (err instanceof Error) {
				toast.error(err.message || "Unknown Error!");
			}
			toast.error("Unknown Error!");
		}
	};

	return (
		<section className="flex flex-col items-center justify-center gap-1 border px-3 py-2">
			<div title={title} className="space-y-2">
				<figure className="relative border p-1 aspect-square">
					<img src={productImage} alt={title} />
					<figcaption
						className="line-clamp-1 overflow-ellipsis"
						title={title}
					>
						{title}
					</figcaption>
					<span className="text-xs">{productId}</span>
					<span className="absolute top-1 right-1 text-transparent font-bold text-xl bg-clip-text bg-gradient-to-r from-red-600 to-lime-900 backdrop-filter">
						{price}
					</span>
				</figure>
			</div>
			<div className="w-full flex items-center flex-wrap justify-around gap-3 mt-2">
				<button
					className="border border-teal-800 text-teal-800 hover:bg-teal-800 hover:text-white transition-all duration-500 font-semibold px-3 py-1"
					onClick={() => handleUpdateProduct(_id)}
				>
					Update
				</button>
				<button
					className="border border-red-800 text-red-800 hover:bg-red-800 hover:text-white transition-all duration-500 font-semibold px-3 py-1"
					onClick={() => handleDeleteProduct(_id)}
				>
					Delete
				</button>
				<button
					className="border border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white transition-all duration-500 font-semibold px-3 py-1"
					onClick={() => dispatch(addToCart(_id))}
				>
					Add to Cart
				</button>
			</div>
		</section>
	);
};

export default Product;
