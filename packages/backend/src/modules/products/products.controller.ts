import { Request, Response } from "express";
import { getProductbyid, insertProduct, queryAllProducts } from "../../utils/productDb";
import unimplemented from "../../utils/unimplemented";

// medita temporal para comprobar si tiene esa estructura
interface structureProduct {
  id: number | undefined,
  slug: string,
  name: string,
  description: string,
  imageUrl: string,
  price: number,/*flotante*/
  stock: number,
  id_brand: number,
  id_category: number
  isDeleted: boolean,
}
function isStructureProduct(obj: any): obj is structureProduct {
  return (
    typeof obj.slug === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.description === 'string' &&
    typeof obj.imageUrl === 'string' &&
    typeof obj.price === 'number' &&
    typeof obj.stock === 'number' &&
    typeof obj.id_brand === 'number' &&
    typeof obj.id_category === 'number' &&
    typeof obj.isDeleted === 'boolean'
  );
}

// Devuelve todos los productos.
export async function getAllProducts(req: Request, res: Response) {
  const result: { error: any } | structureProduct[] = await queryAllProducts()
  if ('error' in result) {
    console.log('Ocurrió un error:', result);
    res.status(500)
    res.send(result)
  } else {
    console.log('Resultado de la consulta:', result);
    res.status(200)
    res.send(result)
  }
}

// Devuelve un producto basado en su ID./ resultado {}
export async function getProduct(req: Request, res: Response) {
  const productId = req.params.productId;
  if (typeof productId !== 'string') {
    res.status(500)
    res.send({ error: 'productId no es válido' })
  } else {
    const result = await getProductbyid(productId)
    res.send(result)
  }
}

// Crea un nuevo producto.
export async function createProduct(req: Request, res: Response) {
  //considerando que se recibe un los datos como body: {slug,name,description,price,stock,state,id_brand,id_Product}
  const datos: Record<string, never> | structureProduct = req.body
  console.log(datos);
  try {
    if (!isStructureProduct(datos)) {
      res.status(500)
      res.send({ error: 'algún dato no es válido, los datos deben ser :: {slug,name,description,price,stock,state,id_brand,id_Product}' })
    } else {
      const result = await insertProduct(datos)
      res.send(result)
    }
  } catch (error) {
    res.status(500)
    res.send({ error: error })
  }

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
