import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/multer';
import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { validateSchema } from './middlewares/validateSchema';
import { createUserSchema, authUserSchema } from './schemas/userSchema';
import { DetailUserController } from './controllers/user/DeatailUserController';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';
import { isAdmin } from './middlewares/isAdmin';
import { createCategorySchema } from './schemas/categorySchema';
import { CreateProductController } from './controllers/product/CreateProductController';
import { ListProductController } from './controllers/product/ListProductController';
import { createProductSchema, listProductSchema, listProductsByCategorySchema } from './schemas/productSchema';
import { ListProductsByCategoryController } from './controllers/product/ListProductsByCategoryController';
import { DeleteProductController } from './controllers/product/DeleteProductController';
import { CreateOrderController } from './controllers/order/CreateOrderController';
import { ListOrderController } from './controllers/order/ListOrderController';
import { createOrderSchema, listOrderSchema } from './schemas/orderSchema';
import { AddItemController } from './controllers/order/AddItemController';
import { addItemSchema } from './schemas/orderSchema';

const router = Router();
const upload = multer(uploadConfig);

//ROTAS USERS
router.post("/users", validateSchema(createUserSchema), new CreateUserController().handle);
router.post("/session", validateSchema(authUserSchema), new AuthUserController().handle);
router.get("/me", isAuthenticated, new DetailUserController().handle);

//ROTAS CATEGORY
router.post("/category", isAuthenticated, isAdmin, validateSchema(createCategorySchema), new CreateCategoryController().handle);
router.get("/category", isAuthenticated, new ListCategoryController().handle);

//ROTAS PRODUCT
router.post("/product", isAuthenticated, isAdmin, upload.single('file'), validateSchema(createProductSchema), new CreateProductController().handle);
router.get("/products", isAuthenticated, validateSchema(listProductSchema), new ListProductController().handle);
router.get("/category/product", isAuthenticated, validateSchema(listProductsByCategorySchema), new ListProductsByCategoryController().handle);
router.delete("/product", isAuthenticated, isAdmin, new DeleteProductController().handle);

//ROTAS ORDER
router.post("/order", isAuthenticated, validateSchema(createOrderSchema), new CreateOrderController().handle);
router.get("/orders", isAuthenticated, validateSchema(listOrderSchema), new ListOrderController().handle);
router.post("/order/add", isAuthenticated, validateSchema(addItemSchema), new AddItemController().handle);

export { router };
