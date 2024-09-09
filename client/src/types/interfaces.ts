export interface Product {
	_id: string;
	title: string;
	productImage: string;
	price: number;
	productId: string;
	createdAt: Date;
	__v: number;
}

export interface ProductsResponse {
	success: boolean;
	totalProducts: number;
	products: Product[];
}

export interface MuteProductResponse {
	success: boolean;
	insertedId?: string;
	insertedIds?: string[];
	message: string;
}
