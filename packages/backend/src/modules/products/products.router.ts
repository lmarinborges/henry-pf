import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getBrands,
  getCategories,
  getProduct,
  updateProduct,
} from "./products.controller";

const productsRouter = Router();

productsRouter
  .get("/products", getAllProducts)
  .post("/products", createProduct)
  .get("/products/:productId", getProduct)
  .put("/products/:productId", updateProduct)
  .delete("/products/:productId", deleteProduct)
  .get("/products/brands", getBrands)
  .get("/products/categories", getCategories);

export default productsRouter;