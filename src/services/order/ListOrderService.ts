import prismaClient from "../../prisma";

interface ListOrderServiceProps {
  draft?: boolean;
}

class ListOrderService {
  async execute({ draft }: ListOrderServiceProps) {
    try {
      const orders = await prismaClient.order.findMany({
        where: {
          draft
        },
        select: {
          id: true,
          table: true,
          name: true,
          status: true,
          draft: true,
          items: {
            select: {
              id: true,
              amount: true,
              product: {
                select: {
                  id: true,
                  name: true,
                  price: true,
                  description: true,
                  banner: true,
                },
              },
            },
          },
          createdAt: true,
          updatedAt: true,
        },
        orderBy: { createdAt: "desc" },
      });

      return orders;
    } catch (error) {
      throw new Error("Falha ao listar pedidos");
    }
  }
}

export { ListOrderService };
