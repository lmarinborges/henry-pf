import express from "express";
import productsRouter from "./modules/products";

const app = express();

app.use(productsRouter);

export default app;
