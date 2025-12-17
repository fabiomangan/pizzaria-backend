import prismaClient from "../../prisma";

interface ListProductServiceProps {
  disabled?: boolean;
}

class ListProductService {
  async execute({ disabled }: ListProductServiceProps) {
    try {
      const products = await prismaClient.product.findMany({
        where: {
          disabled: disabled,
        },
        select: {
          id: true,
          name: true,
          price: true,
          description: true,
          banner: true,
          disabled: true,
          category_id: true,
          category: {
            select: {
              id: true,
              name: true,
            },
          },
          createdAt: true,
          updatedAt: true,
        },
        orderBy: {
          name: "asc",
        },
      });

      return products;
    } catch (error) {
      throw new Error("Falha ao listar produtos");
    }
  }
}

export { ListProductService };
