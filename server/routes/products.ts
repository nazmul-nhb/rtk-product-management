import express, { Request, Response } from "express";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/productControllers";

const router = express.Router();

router.post("/", createProduct);
router.get("/", getProducts);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
 