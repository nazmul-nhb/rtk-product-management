export interface IProduct {
	_id: string;
	title: string;
	productImage: string;
	price: number;
	productId: string;
	createdAt: Date;
	__v: number;
}

export interface IPQueryResponse {
	success: boolean;
	totalProducts: number;
	products: IProduct[];
}

export interface IProductResponse {
	success: boolean;
	product: IProduct;
}

export interface IPMutationResponse {
	success: boolean;
	insertedId?: string;
	insertedIds?: string[];
	message: string;
}

export interface IProductToCreate {
	title: string;
	productImage: string;
	price: number;
}

export interface IProductToUpdate {
	id: string;
	updatedProduct: Partial<IProduct>;
}

export interface ICartState {
	cart: string[];
}
