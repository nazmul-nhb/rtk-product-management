import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { Button, Form, Input } from "antd";
import {
	useGetProductQuery,
	useUpdateProductMutation,
} from "../features/apiSlice";
import { TProductField } from "../types/types";
import { IProductResponse } from "../types/interfaces";

interface IUpdateProps {
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	id: string;
}

const UpdateProduct: React.FC<IUpdateProps> = ({ setOpen, id }) => {
	const { data: productResponse, isLoading } = useGetProductQuery(id);

	const { title, productImage, price } =
		(productResponse as IProductResponse).product || {};

	const [form] = Form.useForm();

	// update to latest product data
	useEffect(() => {
		if (productResponse) {
			form.setFieldsValue({
				title,
				productImage,
				price,
			});
		}
	}, [productResponse, form, title, productImage, price]);

	const [updateProduct] = useUpdateProductMutation();

	const handleUpdateProduct = async (updatedProduct: TProductField) => {
		try {
			await toast.promise(
				updateProduct({ id, updatedProduct }).unwrap(),
				{
					loading: "Updating Product...",
					success: (result) => result.message,
					error: (error) =>
						error.message || "Error Updating Product!",
				}
			);
		} catch (err) {
			if (err instanceof Error) {
				toast.error(err.message || "Unknown Error!");
			}
			toast.error("Unknown Error!");
		} finally {
			form.resetFields();
			setOpen(false);
		}
	};

	if (isLoading)
		return (
			<div className="flex items-center justify-center my-6">
				Loading...
			</div>
		);

	return (
		<section className="w-full px-6 my-6 mx-auto flex flex-col items-center justify-center gap-5">
			<h3 className="text-xl font-bold text-transparent bg-gradient-to-r from-orange-950 to-teal-900 bg-clip-text">
				Update {title}
			</h3>
			<Form
				form={form}
				name="product"
				initialValues={{ title, productImage, price }}
				style={{ width: "100%", maxWidth: 600 }}
				onFinish={handleUpdateProduct}
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
							required: false,
							message: "Please input Product Price!",
						},
					]}
				>
					<Input placeholder="Product Price" />
				</Form.Item>

				<Form.Item>
					<Button type="primary" htmlType="submit">
						Update
					</Button>
				</Form.Item>
			</Form>
		</section>
	);
};

export default UpdateProduct;
