import { Request, Response } from "express";
import { z } from "zod";
import prisma from "../../db";

const paramsSchema = z.object({
  orderId: z.coerce.number().int(),
});

const bodySchema = z.object({
  userId: z.coerce.number().int(),
  total: z.number().min(1),
});

const bodySchemaProd = z.object({
  productId: z.coerce.number().int(),
  orderId: z.coerce.number().int(),
  quantity: z.coerce.number().int(),
});

const getSchema = z.object({
  params: paramsSchema,
});

const createSchema = z.object({
  body: bodySchema,
});

const createSchemaProd = z.object({
  body: bodySchemaProd,
});

// Get all orders
export async function getAllOrders(req: Request, res: Response) {
  const orders = await prisma.order.findMany({
    include: { user: true, products: true },
  });

  res.status(200).json(orders);
}

//Get an order by id
export async function getOrder(req: Request, res: Response) {
  const { params } = await getSchema.parseAsync(req);
  const order = await prisma.order.findUniqueOrThrow({
    where: { id: params.orderId },
    include: { user: true, products: true },
  });
  res.status(200).json(order);
}

// Delet order and its related products
export async function deleteOrder(req: Request, res: Response) {
  const { params } = await getSchema.parseAsync(req);
  const ordersOnProducts = await prisma.ordersOnProducts.deleteMany({
    where: { orderId: params.orderId },
  });
  const order = await prisma.order.delete({
    where: { id: params.orderId },
  });
  res.status(200).json(order);
}

//Create order with user and total amount
export async function createOrder(req: Request, res: Response) {
  const { body: data } = await createSchema.parseAsync(req);
  const order = await prisma.order.create({ data });
  res.status(200).json(order);
}

//Add a product in an order
export async function createProductOrder(req: Request, res: Response) {
  const { body: data } = await createSchemaProd.parseAsync(req);
  const order = await prisma.ordersOnProducts.create({ data });
  res.status(200).json(order);
}
