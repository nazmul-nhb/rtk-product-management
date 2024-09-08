import { Request, Response } from "express";
import { ProductDetails } from "../types/interfaces";
import { Product } from "../models/productModel";

// Create Product(s)
export const createProduct = async (
	req: Request<{}, {}, ProductDetails | ProductDetails[]>,
	res: Response
) => {
	try {
		// Check if req.body is an array (for multiple products)
		if (Array.isArray(req.body)) {
			// Insert multiple products
			const savedProducts = await Product.insertMany(req.body);
			return res.status(201).send({
				success: true,
				insertedIds: savedProducts.map((product) => product._id),
				message: `${savedProducts.length} Products are Saved Successfully!`,
			});
		} else {
			// Insert a single product
			const newProduct = new Product(req.body);
			const savedProduct = await newProduct.save();
			if (savedProduct?._id) {
				return res.status(201).send({
					success: true,
					insertedId: savedProduct._id,
					message: `${savedProduct.title} is Saved Successfully!`,
				});
			}
		}
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error Creating Product(s): ", error.message);
			res.status(400).send({
				success: false,
				message: error.message,
			});
		} else {
			console.error("An Unknown Error Occurred!");
			res.status(500).send({
				success: false,
				message: "Internal Server Error!",
			});
		}
	}
};

// Get all products
export const getProducts = async (req: Request, res: Response) => {
	try {
		const [products, totalProducts] = await Promise.all([
			Product.find({}),
			Product.countDocuments(),
		]);

		return res.status(200).send({
			success: true,
			totalProducts,
			products,
		});
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error Fetching Products: ", error.message);
			res.status(400).send({
				success: false,
				message: error.message,
			});
		} else {
			console.error("An Unknown Error Occurred!");
			res.status(500).send({
				success: false,
				message: "Internal Server Error!",
			});
		}
	}
};

// Update a product by ID
export const updateProduct = async (
	req: Request<{ id: string }, {}, ProductDetails>,
	res: Response
) => {
	try {
		const ID = req.params.id;
		const product = req.body;
		const updatedProduct = await Product.findByIdAndUpdate(ID, product, {
			new: true,
			runValidators: true,
		});

		if (updatedProduct) {
			return res.status(201).send({
				success: true,
				updatedProduct,
				message: `${updatedProduct.title} is Updated Successfully!`,
			});
        } else {
            throw new Error("Cannot Update the Product!")
        }
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error Updating Product: ", error.message);
			res.status(400).send({
				success: false,
				message: error.message,
			});
		} else {
			console.error("An Unknown Error Occurred!");
			res.status(500).send({
				success: false,
				message: "Internal Server Error!",
			});
		}
	}
};
