import express from "express";
import "express-async-errors";
import morgan from "morgan";
import categoriesRouter from "./modules/categories";
import productsRouter from "./modules/products";

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use(productsRouter);
app.use(categoriesRouter)

export default app;
