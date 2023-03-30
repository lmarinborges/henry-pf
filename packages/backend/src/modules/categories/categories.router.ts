import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryByID
} from "./categories.controller";

const categoriesRouter = Router();

categoriesRouter
    .get("/categories", getAllCategories)
    .get("/categories/:idCategory", getCategoryByID)
    .post("/categories", createCategory)
    .delete("/categories/:idCategory", deleteCategory)


export default categoriesRouter;
