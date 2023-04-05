import prisma from "../../db";
import { Request, Response } from "express";
import unimplemented from "../../utils/unimplemented";
import { z } from "zod";

const paramsSchema = z.object({
  userId: z.coerce.number().int(),
});

const bodySchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email(),
  password: z.string().min(1).optional(),
  role: z.enum(["USER", "ADMIN"]),
  state: z.string().min(1),
});

const getSchema = z.object({
  params: paramsSchema,
});

const updateSchema = z.object({
  params: paramsSchema,
  body: bodySchema.partial(),
});

export async function getAllUsers(req: Request, res: Response) {
  const users = await prisma.user.findMany();
  return res.status(200).send(users);
}

export async function getUser(req: Request, res: Response) {
  const { params } = await getSchema.parseAsync(req);
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: params.userId },
  });
  return res.status(200).send(user);
}

export async function createUser(req: Request, res: Response) {
  unimplemented(req, res);
}
export async function updateUser(req: Request, res: Response) {
  // TODO check password and catch
  const { body: data, params } = await updateSchema.parseAsync(req);
  const user = await prisma.user.update({
    where: { id: params.userId },
    data: { ...data },
  });
  return res.status(200).json(user);
  unimplemented(req, res);
}

export async function deleteUser(req: Request, res: Response) {
  unimplemented(req, res);
}
