export interface ErrorObject extends Error {
	status?: number;
}

export interface ProductDetails {
	title: string;
	price: number;
	productImage: string;
}
