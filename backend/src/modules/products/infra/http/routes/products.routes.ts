import { Router } from 'express';
import multer from 'multer';
import { getRepository } from 'typeorm';
import uploadConfig from '@config/upload';

import CategoriesRepository from '@modules/categories/infra/typeorm/repositories/CategoryRepository';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepositories';

import ProductRepository from '@modules/products/infra/typeorm/entities/Product';

import CreateProductService from '@modules/products/services/CreateProductService';
import UpdatedProductPictureService from '@modules/products/services/UpdatedProductPictureService';

import ensureAdminAutheticated from '@modules/users/infra/http/middlewares/ensureAdminAutheticated';
import UpdateProductsQuantityService from '@modules/products/services/UpdateProductsQuantityService';

const productsRouter = Router();
const upload = multer(uploadConfig);

productsRouter.get('/', async (request, response) => {
  const productsRepository = getRepository(ProductRepository);

  const products = await productsRepository.find();

  return response.json(products);
});

productsRouter.post('/', async (request, response) => {
  const { title, description, quantity, category } = request.body;
  const categoriesRepository = new CategoriesRepository();
  const productsRepository = new ProductsRepository();

  const createProduct = new CreateProductService(
    productsRepository,
    categoriesRepository,
  );

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
    const productsRepository = new ProductsRepository();

    const updatedPicture = new UpdatedProductPictureService(productsRepository);

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
    const productsRepository = new ProductsRepository();

    const UpdateQuantity = new UpdateProductsQuantityService(
      productsRepository,
    );

    const product = await UpdateQuantity.execute({
      product_id,
      quantity,
    });
    return response.json(product);
  },
);

export default productsRouter;
