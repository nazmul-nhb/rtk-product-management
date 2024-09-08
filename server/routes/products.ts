import express, { Request, Response } from "express";
import { createProduct } from "../controllers/productControllers";

const router = express.Router();

router.post("/", createProduct);

export default router;
