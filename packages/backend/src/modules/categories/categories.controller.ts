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

export async function createCategory(req: Request, res: Response) {
  try{
    const { id , name , description}: {id: number; name: string; description: string} = req.body
    const createdCategory = await prisma.category.create({
      data: {
        id: id,
        name: name,
        description: description
      },
    })

    return res.status(200).send(createdCategory);
  }
  catch(error){
    return res.status(404).send(error)
  }
  
}
