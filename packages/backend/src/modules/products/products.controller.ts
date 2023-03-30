import { Request, Response } from "express";
import unimplemented from "../../utils/unimplemented";

// Devuelve todos los productos.
export async function getAllProducts(req: Request, res: Response) {
  unimplemented();
}

// Devuelve un producto basado en su ID.
export async function getProduct(req: Request, res: Response) {
  unimplemented();
}

// Crea un nuevo producto.
export async function createProduct(req: Request, res: Response) {
  unimplemented();
}

// Actualiza un producto basado en su ID.
export async function updateProduct(req: Request, res: Response) {
  unimplemented();
}

// Hace borrado lógico de un producto, basado en su ID.
// Si el query param "hard" es "true", entonces debería borrarlo de verdad.
// Ejemplo: DELETE /products/12?hard=true -> Borrado de la base de datos.
//          DELETE /products/12 -> Borrado lógico.
export async function deleteProduct(req: Request, res: Response) {
  unimplemented();
}

// Debería restaurar un producto que se ha borrado de forma lógica.
export async function restoreProduct(req: Request, res: Response) {
  unimplemented();
}

// Devuelve todas las marcas.
// Debería hacer un SELECT DISTINCT.
// https://www.prisma.io/docs/concepts/components/prisma-client/aggregation-grouping-summarizing#select-distinct
export async function getBrands(req: Request, res: Response) {
  unimplemented();
}

// Devuelve todas las categorías.
// Debería hacer un SELECT DISTINCT.
// https://www.prisma.io/docs/concepts/components/prisma-client/aggregation-grouping-summarizing#select-distinct
export async function getCategories(req: Request, res: Response) {
  unimplemented();
}