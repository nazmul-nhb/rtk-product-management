import { Document } from "mongoose";

export interface IProduct {
	title: string;
	productId: string;
	price: number;
	productImage: string;
	createdAt: Date;
}

export type ProductDocument = IProduct & Document;
