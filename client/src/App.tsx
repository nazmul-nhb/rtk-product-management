import {
	useGetAllProductsQuery,
	useGetProductQuery,
} from "./features/apiSlice";

const App = () => {
	const { data = {}, isLoading } = useGetAllProductsQuery();
	const { data: product = {}, isLoading: isProductLoading } =
    useGetProductQuery("66ddf7504f84e28898a73a7e");
  
	if (isLoading || isProductLoading) {
		console.log("Haun Uncle");
	} else {
		console.log(data);
		console.log(product);
	}

	return <div className="text-4xl">Hello Tailwind and SASS</div>;
};

export default App;
