import express from "express";
import "express-async-errors";
import morgan from "morgan";
import productsRouter from "./modules/products";
import brandsRouter from "./modules/brands";

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use(productsRouter);
app.use(brandsRouter);

export default app;
