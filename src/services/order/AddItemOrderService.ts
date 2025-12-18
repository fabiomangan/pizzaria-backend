import prismaClient from "../../prisma";

interface AddItemServiceProps {
  order_id: string;
  product_id: string;
  amount: number;
}

class AddItemOrderService {
  async execute({ order_id, product_id, amount }: AddItemServiceProps) {
    try {
      const orderExist = await prismaClient.order.findFirst({ where: { id: order_id } });

      if (!orderExist) {
        throw new Error("Pedido não encontrado");
      }

      const productExist = await prismaClient.product.findFirst({ where: { id: product_id, disabled: false, } });

      if (!productExist) {
        throw new Error("Produto não encontrado");
      }

      const item = await prismaClient.item.create({
        data: {
          amount,
          order_id,
          product_id,
        },
        select: {
          id: true,
          amount: true,
          order_id: true,
          product_id: true,
          createdAt: true,
          product:{
            select:{
              id: true,
              name: true,
              price: true,
              description: true,
              banner: true,
            }
          }
        },
      });

      return item;
    } catch (error) {
      throw new Error("Falha ao adicionar item ao pedido");
    }
  }
}

export { AddItemOrderService };
