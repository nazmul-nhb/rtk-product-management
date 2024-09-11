import React from "react";
import toast from "react-hot-toast";
import { Button, Form, Input } from "antd";
import { IProductToCreate } from "../types/interfaces";
import { useCreateProductMutation } from "../features/apiSlice";

type ProductField = {
	title?: string;
	price?: number;
	productImage?: string;
};

const CreateProduct: React.FC = () => {
	const [createProduct] = useCreateProductMutation();
	const [form] = Form.useForm();

	const handleCreateProduct = async (product: IProductToCreate) => {
		try {
			await toast.promise(createProduct(product).unwrap(), {
				loading: "Saving Product...",
				success: (result) => result.message,
				error: (error) => error.message || "Error Saving Product!",
			});
		} catch (err) {
			if (err instanceof Error) {
				toast.error(err.message || "Unknown Error!");
			}
			toast.error("Unknown Error!");
		} finally {
			form.resetFields();
		}
	};

	return (
		<section className="w-full px-6 my-6 mx-auto flex flex-col items-center justify-center gap-5">
			<h3 className="text-xl font-bold text-transparent bg-gradient-to-r from-orange-950 to-teal-900 bg-clip-text">
				Create & Save A New Product
			</h3>
			<Form
				form={form}
				name="product"
				style={{ width: "100%", maxWidth: 600 }}
				onFinish={handleCreateProduct}
				autoComplete="on"
			>
				<Form.Item<ProductField>
					name="title"
					rules={[
						{
							required: true,
							message: "Please input Product Title!",
						},
					]}
				>
					<Input placeholder="Product Title" />
				</Form.Item>

				<Form.Item<ProductField>
					name="productImage"
					rules={[
						{
							required: true,
							message: "Please input Product Image Link!",
						},
					]}
				>
					<Input placeholder="Product Image" />
				</Form.Item>

				<Form.Item<ProductField>
					name="price"
					rules={[
						{
							required: true,
							message: "Please input Product Price!",
						},
					]}
				>
					<Input placeholder="Product Price" />
				</Form.Item>

				<Form.Item>
					<Button type="dashed" htmlType="submit">
						Save Product
					</Button>
				</Form.Item>
			</Form>
		</section>
	);
};

export default CreateProduct;
