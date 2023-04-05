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
  const { body: data } = await createSchema.parseAsync(req);
  const hashedPassword: string = await encryptPassword(data.password);
  const user = await prisma.user.create({
    data: { ...data, password: hashedPassword },
  });
  return res.status(200).json(user);
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

// verificar autenticacion
export const isAuthenticated = (req: Request, res: Response, next: any) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(403).json({
    status: "failed",
    message: "no tienes permisos o aun no estas autenticado",
  });
};

export async function facebookAuthenticated(req: Request, res: Response) {
  res.json({ state: "success", message: "bienvenido usuario de facebook" });
}
