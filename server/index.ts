import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./configs/db";
import { ErrorObject } from "./types/interfaces";
import productRoutes from "./routes/products";

dotenv.config();

// create app
const app: Application = express();

// declare port
const port = process.env.PORT || 4242;

// Use IIFE to start the Server
(async () => {
	try {
		// Connect to DB
		await connectDB();

		// Middlewares
		// TODO: Add CORS Options when project is done!
		app.use(cors());
		app.use(express.json());

		// Routes
		app.get("/", async (req: Request, res: Response) => {
			res.send("Server is Running!");
		});
		
		// Actual routes
		app.use("/products", productRoutes);

		// Error handler for 404
		app.use((req: Request, res: Response, next: NextFunction) => {
			const error: ErrorObject = new Error("Requested URL Not Found!");
			error.status = 404;
			next(error);
		});

		// Final error handler
		app.use(
			(
				error: ErrorObject,
				req: Request,
				res: Response,
				next: NextFunction
			) => {
				console.error(error);
				res.status(error.status || 500).send({
					success: false,
					message: error.message || "Internal Server Error!",
				});
			}
		);

		// Start the server
		app.listen(port, () => {
			console.log("Server is Running on Port: ", port);
		});
	} catch (error) {
		console.error("Failed to Start the Server: ", error);
		// process.exit(1);
	}
})();
