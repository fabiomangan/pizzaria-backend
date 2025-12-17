import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/multer'
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
router.post("/product", isAuthenticated, isAdmin, upload.single('file'), new CreateProductController().handle);

export { router };