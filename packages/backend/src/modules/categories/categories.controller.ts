import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import {
  allCategories,
  hardDeleteCategories,
  findIDCategories,
  findNameCategories,
} from "../../utils/categories";
// import unimplemented from "../../utils/unimplemented";

const prisma = new PrismaClient();

// Devuelve todos los productos.
export async function getAllCategories(req: Request, res: Response) {
  const categories = await allCategories();
  return res.status(200).send(categories);
}

export async function getCategory(req: Request, res: Response) {
  const idCategory = req.params.idCategory;

  const foundCategory = await findIDCategories(idCategory);
  if (!foundCategory) return res.status(404).send("Category not found");
  return res.status(200).send(foundCategory);
}

export async function createCategory(req: Request, res: Response) {
  const { name, description }: { name: string; description: string } = req.body;

  const foundCategory = await findNameCategories(name);
  if (foundCategory)
    return res.status(400).json({ msg: "This category allready exists" });

  await prisma.category.create({
    data: {
      name: name,
      description: description,
    },
  });
  return res.status(200).json({ msg: "Category created" });
}

export async function deleteCategory(req: Request, res: Response) {
  const idCategory = req.params.idCategory;

  const foundCategory = await findIDCategories(idCategory);
  if (!foundCategory)
    return res.status(404).json({ msg: "This ID don´t exist in the DB " });

  await hardDeleteCategories(idCategory);
  return res.status(200).json({ msg: "Category deleted" });
}
