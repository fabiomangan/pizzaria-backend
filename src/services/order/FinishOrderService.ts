import prismaClient from "../../prisma";

interface FinishOrderProps{
    order_id: string;
}

class FinishOrderService{
    async execute({ order_id }: FinishOrderProps){
        try {
            //Verificar se essa order_id existe
            const order = await prismaClient.order.findFirst({
                where:{
                    id: order_id
                }
            })

            if(!order){
                throw new Error("Falha ao finalizar pedido")
            }

            const updateOrder = await prismaClient.order.update({
                where:{
                    id: order_id,
                 },
                 data:{
                    status: true,
                 },
                 select:{
                    id: true,
                    table: true,
                    draft: true,
                    status: true,
                    createdAt: true,
                 }
            })

            return updateOrder;
            
        } catch (error) {
            console.log(error);
            throw new Error("Falha ao enviar pedido")
        }
    }
}

export { FinishOrderService }