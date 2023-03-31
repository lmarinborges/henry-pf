import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function allCategories() {
  const categories = await prisma.category.findMany();
  return categories;
}

export async function findIDCategories(idCategory: string) {
  const id = parseInt(idCategory);
  const foundCategory = await prisma.category.findUnique({
    where: {
      id: id,
    },
  });
  return foundCategory;
}

export async function findNameCategories(name: string) {
  const foundCategory = await prisma.category.findFirst({
    where: {
      name: name,
    },
  });
  return foundCategory;
}

export async function hardDeleteCategories(idCategory: string) {
  const id = parseInt(idCategory);
  const foundCategory = await prisma.category.delete({
    where: {
      id: id,
    },
  });
  return foundCategory;
}

// allCategories().then((val) => console.log(val));
