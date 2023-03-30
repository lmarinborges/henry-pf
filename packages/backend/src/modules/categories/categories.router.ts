import { Router } from "express";
import {
  createCategory,
  getAllCategories
} from "./categories.controller";

const categoriesRouter = Router();

categoriesRouter
    .get("/categories", getAllCategories)
    .post("/categories", createCategory)


export default categoriesRouter;
