import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  restoreProduct,
  updateProduct,
} from "./products.controller";

const productsRouter = Router();

productsRouter
  .get("/products", getAllProducts)
  .post("/products", createProduct)
  .get("/products/:productId", getProduct)
  .put("/products/:productId", updateProduct)
  .delete("/products/:productId", deleteProduct)
  .post("/products/:productId", restoreProduct);

export default productsRouter;
