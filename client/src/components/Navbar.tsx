import { useEffect, useRef, useState } from "react";
import { MdMenuOpen, MdOutlineClose } from "react-icons/md";
import { useGetAllProductsQuery } from "../features/apiSlice";
import { IPQueryResponse } from "../types/interfaces";

const Navbar = () => {
	const [openNavbar, setOpenNavbar] = useState<boolean>(false);
	const sidebarRef = useRef<HTMLDivElement>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const { data: productResponse = {} } = useGetAllProductsQuery();
	const products = (productResponse as IPQueryResponse)?.totalProducts || 0;

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(e.target as Node)
			) {
				setOpenNavbar(false);
			}
		};

		document.addEventListener("mouseup", handleClickOutside);

		return () => {
			document.removeEventListener("mouseup", handleClickOutside);
		};
	}, [sidebarRef, dropdownRef]);

	return (
		<nav className="max-w-[1920px] flex items-center justify-between gap-0 md:gap-4 mx-auto shadow-md px-3 py-2 md:px-14 sticky top-0 bg-slate-600 bg-opacity-70 z-50 text-teal-800 transition-all duration-1000 h-16">
			<div className="absolute inset-0 backdrop-filter backdrop-blur-sm -z-10"></div>

			{/* Sandwich Menubar */}
			<div
				ref={sidebarRef}
				className="sm:hidden max-[430px]:text-3xl text-4xl cursor-pointer z-50 fixed"
				onClick={() => setOpenNavbar(!openNavbar)}
			>
				{openNavbar ? (
					<MdOutlineClose className="-ml-1 text-teal-800 hover:text-red-800 transform transition-all duration-1000" />
				) : (
					<MdMenuOpen className="-ml-1 text-red-800 hover:text-teal-800 transform transition-all duration-1000" />
				)}
			</div>

			{/* Site Title */}
			<span className="ml-8 sm:ml-0 flex items-center gap-2 text-lg sm:text-2xl font-bold">
				RTK
				<span className="text-red-800">
					Product <sup>{products}</sup> Management
				</span>
			</span>

			{/* Navbar Items/Links/Routes */}
			<div className="text-lg md:text-xl text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-teal-900">
				<ul
					className={`w-3/5 sm:w-full flex flex-col sm:flex-row justify-start sm:justify-center gap-2 sm:gap-4 font-semibold duration-500 absolute sm:static shadow-lg shadow-slate-700 sm:shadow-none h-screen sm:h-auto p-4 sm:p-0 ${
						openNavbar
							? "md:pl-14 left-0 top-16 bg-slate-600 opacity-70 text-white inset-0 backdrop-filter backdrop-blur-sm flex z-30"
							: "-left-full top-16"
					}`}
				>
					<li>Redux</li>
					<li>TypeScript</li>
					<li>SASS</li>
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
