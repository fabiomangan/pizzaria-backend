import { Request, Response } from "express";
import { ListOrderService } from "../../services/order/ListOrderService";

class ListOrderController {
  async handle(req: Request, res: Response) {
    const draftParam = req.query.draft as string | undefined;

    const draft =
      draftParam === undefined
        ? undefined
        : draftParam === "true";

    const listOrders = new ListOrderService();

    const orders = await listOrders.execute({
      draft,
    });

    return res.status(200).json(orders);
  }
}


export { ListOrderController };
