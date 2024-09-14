import { useGetAllProductsQuery } from "./features/apiSlice";
import { IPQueryResponse } from "./types/interfaces";
import Navbar from "./components/Navbar";
import Product from "./components/Product";
import CreateProduct from "./components/CreateProduct";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TRootState } from "./store/store";
import { removeFromCart } from "./features/cartSlice";

const App = () => {
	const dispatch = useDispatch();
	const cartProducts = useSelector((state: TRootState) => state.cart.cart);
	const { data: productResponse = {}, isLoading } = useGetAllProductsQuery();

	const products = useMemo(
		() => (productResponse as IPQueryResponse)?.products || [],
		[productResponse]
	);

	// remove non-existing ids (in products array) from the cart
	useEffect(() => {
		if (products.length) {
			const nonExistingIds = cartProducts.filter(
				(id) => !products.some((product) => product._id === id)
			);

			if (nonExistingIds.length) {
				nonExistingIds.forEach((ID) => {
					dispatch(removeFromCart(ID));
				});
			}
		}
	}, [cartProducts, dispatch, products]);

	if (isLoading)
		return (
			<div className="flex items-center justify-center my-6">
				Loading...
			</div>
		);

	return (
		<>
			<Navbar />
			<CreateProduct />
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
