export interface IProduct {
	_id: string;
	title: string;
	productImage: string;
	price: number;
	productId: string;
	createdAt: Date;
	__v: number;
}

export interface IProductsQueryResponse {
	success: boolean;
	totalProducts: number;
	products: IProduct[];
}

export interface IProductMutationResponse {
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
