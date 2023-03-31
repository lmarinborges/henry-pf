import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
} from "./categories.controller";

const categoriesRouter = Router();

categoriesRouter
  .get("/categories", getAllCategories)
  .get("/categories/:idCategory", getCategory)
  .post("/categories", createCategory)
  .delete("/categories/:idCategory", deleteCategory);

export default categoriesRouter;
