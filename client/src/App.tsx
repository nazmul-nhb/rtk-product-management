import { useGetAllProductsQuery } from "./features/apiSlice";

const App = () => {
	const { data } = useGetAllProductsQuery();
	console.log(data);

	return <div className="text-4xl">Hello Tailwind and SASS</div>;
};

export default App;
