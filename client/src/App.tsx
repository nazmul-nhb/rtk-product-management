import toast from "react-hot-toast";
import {
	useCreateProductMutation,
	useGetAllProductsQuery,
	useGetProductQuery,
} from "./features/apiSlice";

const newProduct = {
	title: "Picas",
	price: 500,
	productImage: "google.com",
};

const App = () => {
	const [createProduct, { isSuccess, isError, error }] =
		useCreateProductMutation();
	const { data = {}, isLoading } = useGetAllProductsQuery();
	const { data: product = {}, isLoading: isProductLoading } =
		useGetProductQuery("66ddf7504f84e28898a73a7e");

	if (isLoading || isProductLoading) {
		console.log("Haun Uncle");
	} else {
		console.log(data);
		console.log(product);
	}

	const handleCreateProduct = async () => {
		try {
			const result = await createProduct(newProduct).unwrap();
			if (result.success) {
				toast.success(result.message);
			}
		} catch (err) {
			if (err instanceof Error) {
				toast.error(err.message);
			}
			toast.error(err.message || "Unknown Error!");
		}
	};

	return (
		<div className="text-4xl">
			<button onClick={handleCreateProduct}>Create Product</button>
		</div>
	);
};

export default App;
