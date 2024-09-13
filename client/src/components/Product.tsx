import React, { useState } from "react";
import { IProduct } from "../types/interfaces";
import toast from "react-hot-toast";
import { useDeleteProductMutation } from "../features/apiSlice";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import UpdateModal from "./UpdateModal";

interface IProductProps {
	product: IProduct;
}

const Product: React.FC<IProductProps> = ({ product }) => {
	const { _id, title, productImage, productId, price } = product;
	const [open, setOpen] = useState(false);
	const showModal = () => {
		setOpen(true);
	};

	const [deleteProduct] = useDeleteProductMutation();
	const dispatch = useDispatch();

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
					onClick={showModal}
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
			<UpdateModal open={open} setOpen={setOpen} id={_id} />
		</section>
	);
};

export default Product;
