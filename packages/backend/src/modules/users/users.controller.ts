import prisma from "../../db";
import { Request, Response } from "express";
import unimplemented from "../../utils/unimplemented";
import { z } from "zod";
import { encryptPassword } from "./encrypt";

const paramsSchema = z.object({
  userId: z.coerce.number().int(),
});

const passwordSchema = z
  .string()
  .min(8)
  .regex(/[a-z]/, {
    message: "La contraseña debe contener al menos una letra minúscula.",
  })
  .regex(/[A-Z]/, {
    message: "La contraseña debe contener al menos una letra mayúscula.",
  })
  .regex(/\d/, { message: "La contraseña debe contener al menos un número." })
  .regex(/[@#$%^&+=!_]/, {
    message: "La contraseña debe contener al menos un carácter especial.",
  });

const bodySchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().min(5),
  password: passwordSchema,
  role: z.enum(["USER", "ADMIN"]),
  state: z.string(),
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
  const { body: data } = await createSchema.parseAsync(req);
  const hashedPassword: string = await encryptPassword(data.password);
  const user = await prisma.user.create({
    data: { ...data, password: hashedPassword },
  });
  return res.status(200).json(user);
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
