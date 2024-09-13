import { useGetAllProductsQuery } from "./features/apiSlice";
import { IPQueryResponse } from "./types/interfaces";
import Navbar from "./components/Navbar";
import Product from "./components/Product";
import CreateProduct from "./components/CreateProduct";

const App = () => {
	const { data: productResponse = {}, isLoading } = useGetAllProductsQuery();
	const products = (productResponse as IPQueryResponse)?.products || [];

	if (isLoading)
		return (
			<div className="flex items-center justify-center my-6">
				Loading...
			</div>
		);

	return (
		<>
			<Navbar />
			<CreateProduct/>
			<main className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 my-6 px-8 mx-auto">
				{products?.map((product) => (
					<div key={product._id}>
						<Product product={product} />
					</div>
				))}
			</main>
		</>
	);
};

export default App;
