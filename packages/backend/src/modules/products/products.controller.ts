import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Request, Response } from "express";
import { z } from "zod";
import prisma from "../../db";
import slugid from "../../utils/slugid";
import transformDecimal from "../../utils/transformDecimal";

const paramsSchema = z.object({
  productId: z.coerce.number().int(),
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
  `${value
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")}-${slugid()}`;

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
  // Added loop in case of unique constraint violation.
  let product = null;
  while (product === null) {
    const slug = createSlug(data.name);
    try {
      product = await prisma.product.create({
        data: {
          ...data,
          slug,
          category: { connect: { id: category } },
          brand: { connect: { id: brand } },
        },
      });
    } catch (err) {
      if (
        err instanceof PrismaClientKnownRequestError &&
        err.code === "P2002"
      ) {
        continue;
      } else {
        throw err;
      }
    }
  }
  return res.status(201).json(product);
}

// Actualiza un producto basado en su ID.
export async function updateProduct(req: Request, res: Response) {
  const {
    body: { brand, category, ...data },
    params,
  } = await updateSchema.parseAsync(req);
  let product = null;
  while (product === null) {
    const slug =
      typeof data.name !== "undefined" ? createSlug(data.name) : undefined;
    try {
      product = await prisma.product.update({
        where: { id: params.productId },
        data: {
          ...data,
          slug,
          brandId: brand,
          categoryId: category,
        },
      });
    } catch (err) {
      if (
        err instanceof PrismaClientKnownRequestError &&
        err.code === "P2002"
      ) {
        continue;
      } else {
        throw err;
      }
    }
  }
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
