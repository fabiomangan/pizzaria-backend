import prismaClient from "../../prisma";

interface sendOrderProps{
    name: string;
    order_id: string;
}

class SendOrderService{
    async execute({ name, order_id }: sendOrderProps){
        try {
            //Verificar se essa order_id existe
            const order = await prismaClient.order.findFirst({
                where:{
                    id: order_id
                }
            })

            if(!order){
                throw new Error("Falha ao enviar pedido")
            }

            //Atualiza a apropriedade draft para false
            const updateOrder = await prismaClient.order.update({
                where:{
                    id: order_id,
                 },
                 data:{
                    draft: false,
                    name: name,
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

export { SendOrderService }