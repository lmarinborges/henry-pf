import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Devuelve todos las marcas.
export async function getAllBrands(req: Request, res: Response) {
  try {
    const allBrands = await prisma.brand.findMany();
    console.log(allBrands);
    res.status(200).json(allBrands);
  } catch (error: any) {
    res.status(400).json(error.message);
  }
}

// Devuelve un marca basado en su ID.
export async function getBrand(req: Request, res: Response) {
  try {
    const { brandId } = req.params;
    const oneBrand = await prisma.brand.findUnique({
      where: {
        id: parseInt(brandId),
      },
    });
    res.status(200).json(oneBrand);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
}

// Actualiza un marca basado en su ID.
export async function updateBrand(req: Request, res: Response) {
  try {
    const { brandId } = req.params;
    const newValue: {
      name: string;
      description: string;
    } = req.body;

    const oneBrand = await prisma.brand.update({
      where: {
        id: parseInt(brandId),
      },
      data: {
        name: newValue.name,
        description: newValue.description,
      },
    });
    res.status(200).json(oneBrand);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
}

// Borrado físico, validar si existe marca con esa marca.
export async function deleteBrand(req: Request, res: Response) {
  try {
    const { brandId } = req.params;
    const oneBrand = await prisma.brand.delete({
      where: {
        id: parseInt(brandId),
      },
    });
    res.status(200).json(oneBrand);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
}

// Crear marca
export async function createBrand(req: Request, res: Response) {
  try {
    const newValue: {
      name: string;
      description: string;
    } = req.body;

    const oneBrand = await prisma.brand.create({
      data: {
        name: newValue.name,
        description: newValue.description,
      },
    });
    res.status(200).json(oneBrand);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
}
