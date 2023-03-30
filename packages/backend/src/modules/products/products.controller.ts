import { Request, Response } from "express";
import unimplemented from "../../utils/unimplemented";

// Devuelve todos los productos.
export async function getAllProducts(req: Request, res: Response) {
  unimplemented(req, res);
}

// Devuelve un producto basado en su ID.
export async function getProduct(req: Request, res: Response) {
  unimplemented(req, res);
}

// Crea un nuevo producto.
export async function createProduct(req: Request, res: Response) {
  unimplemented(req, res);
}

// Actualiza un producto basado en su ID.
export async function updateProduct(req: Request, res: Response) {
  unimplemented(req, res);
}

// Hace borrado lógico de un producto, basado en su ID.
// Si el query param "hard" es "true", entonces debería borrarlo de verdad.
// Ejemplo: DELETE /products/12?hard=true -> Borrado de la base de datos.
//          DELETE /products/12 -> Borrado lógico.
export async function deleteProduct(req: Request, res: Response) {
  unimplemented(req, res);
}

// Debería restaurar un producto que se ha borrado de forma lógica.
export async function restoreProduct(req: Request, res: Response) {
  unimplemented(req, res);
}
