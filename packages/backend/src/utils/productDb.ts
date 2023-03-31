import { PrismaClient, Product } from "@prisma/client";
const prisma = new PrismaClient();
interface structureProduct {
  id: number;
  slug: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number /*flotante*/;
  stock: number;
  id_brand: number;
  id_category: number;
  isDeleted: boolean;
}

export async function insertProduct(information: structureProduct) {
  const slug = information.slug;
  const name = information.name;
  const description = information.description;
  const price = information.price;
  const imageUrl = information.imageUrl;
  const stock = information.stock;
  const isDeleted = information.isDeleted;
  const id_brand = information.id_brand;
  const id_category = information.id_category;
  try {
    const res = await prisma.product.create({
      data: {
        slug,
        name,
        description,
        imageUrl,
        price,
        stock,
        isDeleted,
        brand: { connect: { id: id_brand } },
        category: { connect: { id: id_category } },
      },
      select: { id: true },
    });

    return res;
  } catch (error) {
    console.log(error);
    return { error: error };
  }
}

export async function getProductbyid(id: string) {
  try {
    const res = await prisma.product.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    return res;
  } catch (error) {
    console.log(error);
    return { error: error };
  }
}
export async function queryAllProducts() {
  try {
    const res: [] | structureProduct[] =
      await prisma.$queryRaw`SELECT * FROM "Product"`;
    if (res.length === 0) {
      return { error: "no hay datos" };
    } else {
      //para devolver el arreglo ordenado según el id
      res.sort((a, b) => a.id - b.id);
      return res;
    }
  } catch (error) {
    return { error: error };
  }
}
export async function queryupdateProduct(
  id: string,
  changes: Partial<structureProduct>
) {
  try {
    const res = await prisma.product.update({
      where: {
        id: parseInt(id),
      },
      data: changes,
    });
    return res;
  } catch (error) {
    console.log(error);
    return { error: error };
  }
}
export async function queryHardDelete(id: string) {
  try {
    const res = await prisma.product.delete({
      where: {
        id: parseInt(id),
      },
    });
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    return { error: error };
  }
}

export async function queryLogicDelete(id: string) {
  console.log("borrado logico");

  try {
    const res = await prisma.product.update({
      where: {
        id: parseInt(id),
      },
      data: {
        isDeleted: true,
      },
    });
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    return { error: error };
  }
}
export async function queryRestore(id: string) {
  console.log("borrado logico");
  try {
    const res = await prisma.product.update({
      where: {
        id: parseInt(id),
      },
      data: {
        isDeleted: false,
      },
    });
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    return { error: error };
  }
}

interface options {
  column: string;
  order: "asc" | "desc";
}

export async function queryPaginateAndOrder(
  currentPage: number,
  itemsPerPage: number,
  options: options[]
) {
  const skip = (currentPage - 1) * itemsPerPage;
  const take = itemsPerPage;
  const sort = options.map((option) => ({
    [option.column]: option.order,
  }));

  const productos = await prisma.product.findMany({
    skip,
    take,
    orderBy: sort,
  });

  return productos;
}
