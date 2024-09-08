import express, { Request, Response } from "express";
import { createProduct, getProducts } from "../controllers/productControllers";

const router = express.Router();

router.post("/", createProduct);
router.get("/", getProducts);

export default router;
