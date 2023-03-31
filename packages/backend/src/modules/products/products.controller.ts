import { Request, Response } from "express";
import { object } from "zod";
import { array } from "zod/lib";
import { getProductbyid, insertProduct, queryAllProducts, queryHardDelete, queryLogicDelete, queryPaginateAndOrder, queryRestore, queryupdateProduct } from "../../utils/productDb";
import unimplemented from "../../utils/unimplemented";

// media temporal para comprobar si tiene esa estructura
interface structureProduct {
  id: number,
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
  const productId = req.params.productId;
  const datos: object | undefined = req.body.datos

  if (typeof datos !== 'object') {
    res.status(500)
    res.send({ error: 'algún dato no es válido' })
  } else {
    const result = await queryupdateProduct(productId, datos)
    res.send(result)
  }

}

// Hace borrado lógico de un producto, basado en su ID.
// Si el query param "hard" es "true", entonces debería borrarlo de verdad.
// Ejemplo: DELETE /products/12?hard=true -> Borrado de la base de datos.
//          DELETE /products/12 -> Borrado lógico.
export async function deleteProduct(req: Request, res: Response) {
  const productId = req.params.productId;
  const isHard = req.query.hard === 'true';
  try {
    if (isHard) {
      const result = await queryHardDelete(productId)
      res.send(result)
    } else {
      const result = await queryLogicDelete(productId)
      res.send(result)
    }
  } catch (error) {
    console.log(error);
    res.send({ error: error })
  }

}

// Debería restaurar un producto que se ha borrado de forma lógica.
export async function restoreProduct(req: Request, res: Response) {
  const productId = req.params.productId;
  try {
    const result = await queryRestore(productId)
    res.send(result)
  } catch (error) {
    console.log(error);
    res.send({ error: error })
  }
}



// deberia mostrar un segmento de todos los productos según las configuraciones del paginado
export async function paginateProducts(req: Request, res: Response) {
  // recibiendo y convvirtiendo a Json las opciones de ordenamiento
  const dataInStr = req.query.options as string
  const options = JSON.parse(decodeURIComponent(dataInStr))
  // datos iniciales del paginado
  let currentPage: number;
  let itemsPerPage: number;

  //condicional que los datos son correctos , options puede ser un [] vacío o tener [{column: "name-column", order: "asc o desc"}] 
  if (typeof req.query.current == 'string' && typeof req.query.items == 'string' && Array.isArray(options)) {
    currentPage = parseInt(req.query.current) || 1;
    itemsPerPage = parseInt(req.query.items) || 2;
    const result: { error: any } | structureProduct[] = await queryAllProducts()
    const result2 = await queryPaginateAndOrder(currentPage, itemsPerPage, options)
    if ('error' in result) {
      console.log('Ocurrió un error en la consulta:', result);
      res.status(500)
      res.send({ error: result })
    } else {
      console.log('cantidad de la consulta:', result.length);
      res.status(200)
      res.send({ productos: result2, currentPage: currentPage, totalPages: result.length })
    }
  } else {
    res.status(500)
    res.send({ error: 'los datos no son válidos, se esperaba en body { current : "" , items : "" , options : [{column: "name-column", order: "asc o desc"}] } ' })
  }
}

