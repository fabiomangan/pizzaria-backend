import prismaClient from "../../prisma";

interface RemoveItemServiceProps {
  item_id: string;
}

class RemoveItemService {
  async execute({ item_id }: RemoveItemServiceProps) {
    try {
      const itemExists = await prismaClient.item.findUnique({ where: { id: item_id } });

      if (!itemExists) {
        throw new Error("Item não encontrado");
      }

      await prismaClient.item.delete({ where: { id: item_id } });

      return { message: "Item removido com sucesso" };
      
    } catch (error) {
      throw new Error("Falha ao remover item");
    }
  }
}

export { RemoveItemService };