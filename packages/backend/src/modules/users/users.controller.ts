import prisma from "../../db";
import { Request, Response } from "express";
import unimplemented from "../../utils/unimplemented";
import { z } from "zod";

const paramsSchema = z.object({
  userId: z.coerce.number().int(),
});

const bodySchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().min(1),
  password: z.string().min(1).optional(),
  role: z.enum(["USER", "ADMIN"]),
  state: z.string().min(1),
});

const updateSchema = z.object({
  params: paramsSchema,
  body: bodySchema.partial(),
});

export async function getAllUsers(req: Request, res: Response) {
  unimplemented(req, res);
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
}

export async function deleteUser(req: Request, res: Response) {
  unimplemented(req, res);
}
