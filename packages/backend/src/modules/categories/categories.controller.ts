import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client'
// import unimplemented from "../../utils/unimplemented";

const prisma = new PrismaClient()


// Devuelve todos los productos.
export async function getAllCategories(req: Request, res: Response) {
  try{
    const allCategories = await prisma.category.findMany()
    return res.status(200).send(allCategories);
  }
  catch(error){
    return res.status(404).send(error)
  }
}

export async function getCategoryByID(req: Request, res: Response) {
  try{
    const idCategory= parseInt(req.params.idCategory)
    const foundCategory = await prisma.category.findUnique({
      where: {
        id: idCategory
      }
    })
    return res.status(200).send(foundCategory);
  }
  catch(error){
    return res.status(404).send(error)
  }
}

export async function createCategory(req: Request, res: Response) {
  try{
    const { name , description}: {name: string; description: string} = req.body
      await prisma.category.create({
        data: {
          name: name,
          description: description
        },
      })
    return res.status(200).json({msg:"Category created"});
  }
  catch(error){
    return res.status(404).send(error)
  }
}

export async function deleteCategory(req: Request, res: Response) {
  const idCategory= parseInt(req.params.idCategory)
    await prisma.category.delete({
      where: {
        id: idCategory
      }
  })
  return res.status(200).json({msg:"Category deleted"});
}
