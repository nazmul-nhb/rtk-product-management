import React, { useState } from "react";
import toast from "react-hot-toast";
import { Button, Form, Input } from "antd";
import { IProductToCreate } from "../types/interfaces";
import { useCreateProductMutation } from "../features/apiSlice";
import { TProductField } from "../types/types";

const CreateProduct: React.FC = () => {
	const [showForm, setShowForm] = useState<boolean>(false);
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
		<section
			className={`w-full px-6 my-6 mx-auto flex flex-col items-center justify-center gap-5 transition-all duration-1000 ease-in-out overflow-hidden origin-top ${
				showForm ? "max-h-full opacity-100" : "max-h-16 opacity-70"
			}`}
		>
			<h3
				onClick={() => setShowForm(!showForm)}
				className="cursor-pointer text-xl font-bold text-transparent bg-gradient-to-r from-orange-950 to-teal-900 bg-clip-text"
			>
				Create & Save A New Product
			</h3>
			<div
				className={`w-full flex items-center justify-center transition-all duration-700 ease-in-out origin-center ${
					showForm
						? "opacity-100 scale-100 max-h-full"
						: "opacity-0 scale-0 max-h-0"
				}`}
			>
				<Form
					form={form}
					name="product"
					style={{ width: "100%", maxWidth: 600 }}
					onFinish={handleCreateProduct}
					autoComplete="on"
				>
					<Form.Item<TProductField>
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

					<Form.Item<TProductField>
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

					<Form.Item<TProductField>
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
			</div>
		</section>
	);
};

export default CreateProduct;
