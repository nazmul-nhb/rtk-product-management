import express, { Request, Response } from "express";
import { createProduct, getProducts, updateProduct } from "../controllers/productControllers";

const router = express.Router();

router.post("/", createProduct);
router.get("/", getProducts);
router.patch("/:id", updateProduct);

export default router;
