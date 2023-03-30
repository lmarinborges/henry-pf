import { PrismaClient, Product } from "@prisma/client"
const prisma = new PrismaClient()
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

export async function insertProduct(information: structureProduct) {
    const slug = information.slug
    const name = information.name
    const description = information.description
    const price = information.price
    const imageUrl = information.imageUrl
    const stock = information.stock
    const isDeleted = information.isDeleted
    const id_brand = information.id_brand
    const id_category = information.id_category
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

        return res
    } catch (error) {
        console.log(error);
        return { error: error }
    }
}

export async function getProductbyid(id: string) {
    try {
        const res = await prisma.product.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        return res
    } catch (error) {
        console.log(error);
        return { error: error }
    }
}
export async function queryAllProducts() {
    try {
        const res: [] | structureProduct[] = await prisma.$queryRaw`SELECT * FROM "Product"`;
        if (res.length === 0) {
            return { error: 'no hay datos' };
        } else {
            return res;
        }
    } catch (error) {
        return { error: error };
    }
}