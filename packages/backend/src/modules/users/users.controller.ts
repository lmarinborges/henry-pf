import prisma from "../../db";
import { Request, Response } from "express";
import unimplemented from "../../utils/unimplemented";
import { z } from "zod";

const paramsSchema = z.object({
  brandId: z.coerce.number().int(),
});

const bodySchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1).optional(),
});

const getSchema = z.object({
  params: paramsSchema,
});

const createSchema = z.object({
  body: bodySchema,
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
  unimplemented(req, res);
}

export async function deleteUser(req: Request, res: Response) {
  unimplemented(req, res);
}

export async function facebookAuth(req: Request, res: Response) {
  res.send("bienvenido");
}
