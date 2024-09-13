import React from "react";
import toast from "react-hot-toast";
import { Button, Form, Input } from "antd";
import { useUpdateProductMutation } from "../features/apiSlice";
import { TProductField } from "../types/types";
import { IProduct } from "../types/interfaces";

interface IUpdateProps {
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	product: IProduct;
}

const UpdateProduct: React.FC<IUpdateProps> = ({ setOpen, product }) => {
	const { _id: id, title, productImage, price } = product;
	const [form] = Form.useForm();

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
