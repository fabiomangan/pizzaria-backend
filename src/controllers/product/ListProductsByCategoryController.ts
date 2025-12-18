import { Request, Response } from "express";
import { ListProductsByCategoryService } from "../../services/product/ListProductsByCategoryService";

class ListProductsByCategoryController {
  async handle(req: Request, res: Response) {
    const category_id = req.query.category_id as string;

    const listProductsByCategory = new ListProductsByCategoryService();

    const products = await listProductsByCategory.execute({ 
        category_id: category_id,
     });

    res.status(200).json(products);
  }
}

export { ListProductsByCategoryController };