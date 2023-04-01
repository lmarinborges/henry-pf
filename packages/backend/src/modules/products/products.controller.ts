import { Request, Response } from "express";
import { z } from "zod";
import prisma from "../../db";
import transformDecimal from "../../utils/transformDecimal";

const paramsSchema = z.object({
  productId: z.coerce.number(),
});

const createSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1).optional(),
  imageUrl: z.string(),
  price: z.string().transform(transformDecimal),
  stock: z.number().int(),
  brand: z.number().int(),
  category: z.number().int(),
});

const updateSchema = z.object({
  params: paramsSchema,
  body: createSchema.partial(),
});

const createSlug = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

// Devuelve todos los productos.
export async function getAllProducts(req: Request, res: Response) {
  const products = await prisma.product.findMany();
  res.status(200).json(products);
}

// Devuelve un producto basado en su ID./ resultado {}
export async function getProduct(req: Request, res: Response) {
  const { productId } = await paramsSchema.parseAsync(req.params);
  const product = await prisma.product.findUniqueOrThrow({
    where: { id: productId },
  });
  return res.status(200).json(product);
}

// Crea un nuevo producto.
export async function createProduct(req: Request, res: Response) {
  const { brand, category, ...data } = await createSchema.parseAsync(req.body);
  // Calculate the slug by parsing the provided name.
  const slug = createSlug(data.name);
  const product = await prisma.product.create({
    data: {
      ...data,
      slug,
      category: { connect: { id: category } },
      brand: { connect: { id: brand } },
    },
  });
  return res.status(201).json(product);
}

// Actualiza un producto basado en su ID.
export async function updateProduct(req: Request, res: Response) {
  const {
    body: { brand, category, ...data },
    params,
  } = await updateSchema.parseAsync(req);
  const slug =
    typeof data.name !== "undefined" ? createSlug(data.name) : undefined;
  const product = await prisma.product.update({
    where: { id: params.productId },
    data: {
      ...data,
      slug,
      brand: { connect: { id: brand } },
      category: { connect: { id: category } },
    },
  });
  return res.status(200).json(product);
}

// Borra un producto basado en su ID.
export async function deleteProduct(req: Request, res: Response) {
  const { productId } = await paramsSchema.parseAsync(req.params);
  const product = await prisma.product.delete({
    where: { id: productId },
  });
  return res.status(200).json(product);
}
