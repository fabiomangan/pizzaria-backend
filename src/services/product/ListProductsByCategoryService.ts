import prismaClient from "../../prisma";

interface ListProductByCategoryServiceProps {
  category_id: string;
}

class ListProductsByCategoryService {
  async execute({ category_id }: ListProductByCategoryServiceProps) {
    try {
      const products = await prismaClient.product.findMany({
        where: {
          category_id,
          disabled: false,
        },
        select: {
          id: true,
          name: true,
          price: true,
          description: true,
          banner: true,
          category_id: true,
          category: {
            select: {
              id: true,
              name: true,
            }
          },
          createdAt: true,
          updatedAt: true,
        },
        orderBy: { name: "asc" },
      });

      return products;
    } catch (error) {
      throw new Error("Falha ao listar produtos por categoria");
    }
  }
}

export { ListProductsByCategoryService };