import { Request, Response } from "express";
import prisma from "../../db";

// Devuelve todos las marcas.
export async function getAllBrands(req: Request, res: Response) {
  const brands = await prisma.brand.findMany();
  res.status(200).json(brands);
}

// Devuelve un marca basado en su ID.
export async function getBrand(req: Request, res: Response) {
  const { brandId } = req.params;
  const brand = await prisma.brand.findUnique({
    where: { id: parseInt(brandId) },
  });
  res.status(200).json(brand);
}

// Actualiza un marca basado en su ID.
export async function updateBrand(req: Request, res: Response) {
  const { brandId } = req.params;
  const data: {
    name: string;
    description: string;
  } = req.body;
  const brand = await prisma.brand.update({
    where: { id: parseInt(brandId) },
    data,
  });
  res.status(200).json(brand);
}

// Borrado físico, validar si existe marca con esa marca.
export async function deleteBrand(req: Request, res: Response) {
  const { brandId } = req.params;
  const brand = await prisma.brand.delete({
    where: { id: parseInt(brandId) },
  });
  res.status(200).json(brand);
}

// Crear marca
export async function createBrand(req: Request, res: Response) {
  const data: {
    name: string;
    description: string;
  } = req.body;
  const oneBrand = await prisma.brand.create({ data });
  res.status(200).json(oneBrand);
}
