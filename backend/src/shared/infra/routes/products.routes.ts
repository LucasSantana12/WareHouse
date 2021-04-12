import { Router } from 'express';
import multer from 'multer';
import { getRepository } from 'typeorm';
import uploadConfig from '../../config/upload';

import ProductRepository from '../../modules/products/entities/Product';

import CreateProductService from '../../modules/products/services/CreateProductService';
import UpdatedProductPictureService from '../../modules/products/services/UpdatedProductPictureService';

import ensureAdminAutheticated from '../middlewares/ensureAdminAutheticated';
import UpdateProductsQuantityService from '../../modules/products/services/UpdateProductsQuantityService';

const productsRouter = Router();
const upload = multer(uploadConfig);

productsRouter.get('/', async (request, response) => {
  const productsRepository = getRepository(ProductRepository);

  const products = await productsRepository.find();

  return response.json(products);
});

productsRouter.post('/', ensureAdminAutheticated, async (request, response) => {
  const { title, description, quantity, category } = request.body;

  const createProduct = new CreateProductService();

  const product = await createProduct.execute({
    title,

    description,

    quantity,

    category,
  });

  return response.json(product);
});

productsRouter.patch(
  '/:id/picture',
  ensureAdminAutheticated,
  upload.single('file'),
  async (request, response) => {
    const { product_id } = request.params;
    const updatedPicture = new UpdatedProductPictureService();

    const product = await updatedPicture.execute({
      product_id,
      fileName: request.file.filename,
    });
    return response.json(product);
  },
);

productsRouter.patch(
  '/:id/quantity',
  ensureAdminAutheticated,
  async (request, response) => {
    const { product_id } = request.params;
    const { quantity } = request.body;

    const UpdateQuantity = new UpdateProductsQuantityService();

    const product = await UpdateQuantity.execute({
      product_id,
      quantity,
    });
    return response.json(product);
  },
);

export default productsRouter;
