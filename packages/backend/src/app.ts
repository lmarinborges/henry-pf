import express from "express";
import "express-async-errors";
import morgan from "./middleware/morgan";
import brandsRouter from "./modules/brands";
import categoriesRouter from "./modules/categories";
import productsRouter from "./modules/products";

const app = express();

// Middleware
app.use(morgan());
app.use(express.json());

// Routes
app.use(productsRouter);
app.use(brandsRouter);
app.use(categoriesRouter);

export default app;
