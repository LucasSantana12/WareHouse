import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import ensureAdminAutheticated from '@modules/users/infra/http/middlewares/ensureAdminAutheticated';
import ProductsController from '../controllers/ProductsController';
import ProductPictureController from '../controllers/ProductPictureController';
import ProductQuantityController from '../controllers/ProductQuantityController';

const productsRouter = Router();
const productsController = new ProductsController();
const productPicture = new ProductPictureController();
const productQuantity = new ProductQuantityController();
const upload = multer(uploadConfig);

productsRouter.get('/', productsController.show);

productsRouter.post('/', productsController.create);

productsRouter.patch(
  '/:id/picture',
  ensureAdminAutheticated,
  upload.single('file'),
  productPicture.update,
);

productsRouter.patch(
  '/:id/quantity',
  ensureAdminAutheticated,
  productQuantity.update,
);

export default productsRouter;
