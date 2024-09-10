import toast from "react-hot-toast";
import {
	useCreateProductMutation,
	useDeleteProductMutation,
	useGetAllProductsQuery,
	// useGetProductQuery,
	useUpdateProductMutation,
} from "./features/apiSlice";
import { IPQueryResponse } from "./types/interfaces";

const newProduct = {
	title: "Picas",
	price: 500,
	productImage: "google.com",
};

const updatedProduct = {
	title: "Updated",
};

const App = () => {
	const [createProduct] = useCreateProductMutation();
	const [updateProduct] = useUpdateProductMutation();
	const [deleteProduct] = useDeleteProductMutation();
	const { data: productResponse = {}, isLoading } = useGetAllProductsQuery();
	// const { data: product = {}, isLoading: isProductLoading } =
	// 	useGetProductQuery("66ddf7504f84e28898a73a7e");

	const products = (productResponse as IPQueryResponse)?.products || [];

	// if (isLoading || isProductLoading) {
	// 	console.log("Haun Uncle");
	// } else {
	// 	console.log(products);
	// 	console.log(product);
	// }

	const handleCreateProduct = async () => {
		try {
			const result = await createProduct(newProduct).unwrap();
			if (result.success) {
				toast.success(result.message);
			}
		} catch (err) {
			if (err instanceof Error) {
				toast.error(err.message || "Unknown Error!");
			}
			toast.error("Unknown Error!");
		}
	};

	const handleUpdateProduct = async (id: string) => {
		try {
			const result = await updateProduct({ id, updatedProduct }).unwrap();
			if (result.success) {
				toast.success(result.message);
			}
		} catch (err) {
			if (err instanceof Error) {
				toast.error(err.message || "Unknown Error!");
			}
			toast.error("Unknown Error!");
		}
	};

	const handleDeleteProduct = async (id: string) => {
		try {
			const result = await deleteProduct(id).unwrap();
			if (result.success) {
				toast.success(result.message);
			}
		} catch (err) {
			if (err instanceof Error) {
				toast.error(err.message || "Unknown Error!");
			}
			toast.error("Unknown Error!");
		}
	};

	if (isLoading)
		return (
			<div className="flex items-center justify-center">Loading...</div>
		);

	return (
		<main className="flex justify-around flex-wrap gap-5 my-6">
			<button
				className="border border-black hover:bg-black hover:text-white transition-all duration-500 font-semibold px-3 py-1"
				onClick={handleCreateProduct}
			>
				Create Product
			</button>
			{products?.map((p, idx) => {
				const { title, _id } = p;
				return (
					<div
						key={_id}
						className="flex flex-col items-center justify-center gap-1 border px-3 py-2"
					>
						<h3>
							{idx + 1}. {title}
						</h3>
						<button
							className="border border-teal-800 hover:bg-teal-800 hover:text-white transition-all duration-500 font-semibold px-3 py-1"
							onClick={() => handleUpdateProduct(_id)}
						>
							Update {title}
						</button>
						<button
							className="border border-red-800 hover:bg-red-800 hover:text-white transition-all duration-500 font-semibold px-3 py-1"
							onClick={() => handleDeleteProduct(_id)}
						>
							Delete {title}
						</button>
					</div>
				);
			})}
		</main>
	);
};

export default App;
