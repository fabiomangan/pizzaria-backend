import prismaClient from "../../prisma";

interface DetailOrderServiceProps {
  order_id: string;
}

class DetailOrderService {
  async execute({ order_id }: DetailOrderServiceProps) {
    try {
      const order = await prismaClient.order.findUnique({
        where: { id: order_id },
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
      });

      if (!order) {
        throw new Error("Pedido não encontrado");
      }

      return order;
    } catch (error) {
      throw new Error("Falha ao buscar detalhe do pedido");
    }
  }
}

export { DetailOrderService };
