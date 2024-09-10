import {
	useGetAllProductsQuery,
	useCreateProductMutation,
} from "./features/apiSlice";
import { IPQueryResponse } from "./types/interfaces";
import Navbar from "./components/Navbar";
import Product from "./components/Product";
import toast from "react-hot-toast";

const newProduct = {
	title: "Picas",
	price: 500,
	productImage: "google.com",
};

const App = () => {
	const { data: productResponse = {}, isLoading } = useGetAllProductsQuery();
	const [createProduct] = useCreateProductMutation();
	const products = (productResponse as IPQueryResponse)?.products || [];

    	const handleCreateProduct = async () => {
		try {
			toast.promise(createProduct(newProduct).unwrap(), {
				loading: "Saving Product...",
				success: (result) => result.message,
				error: (error) => error.message || "Error Saving Product!",
			});
		} catch (err) {
			if (err instanceof Error) {
				toast.error(err.message || "Unknown Error!");
			}
			toast.error("Unknown Error!");
		}
		};
	
	if (isLoading)
		return (
			<div className="flex items-center justify-center my-6">
				Loading...
			</div>
		);

	return (
		<>
			<Navbar />
			<main className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 my-6 px-8 mx-auto">
				<button
					className="border border-black hover:bg-black hover:text-white transition-all duration-500 font-semibold px-3 py-1 "
					onClick={handleCreateProduct}
				>
					Create Product
				</button>

				{products?.map((p) => (
					<div key={p._id}>
						<Product product={p} />
					</div>
				))}
			</main>
		</>
	);
};

export default App;
