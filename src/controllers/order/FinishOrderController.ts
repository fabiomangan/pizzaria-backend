import { Request, Response } from "express";
import { FinishOrderService } from "../../services/order/FinishOrderService";

class FinishOrderController{
    async handle(req: Request, res: Response){

        const { order_id } = req.body;

        const finishOrder = new FinishOrderService();

        const updateOrder = await finishOrder.execute({ order_id: order_id })

        return res.status(200).json(updateOrder);

    }
}

export { FinishOrderController }