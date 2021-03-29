import { Router } from 'express';

import { getRepository } from 'typeorm';

import ProductRepository from '../models/Product';

import CreateProductService from '../services/CreateProductService';

import ensureAdminAutheticated from '../middlewares/ensureAdminAutheticated';

const productsRouter = Router();

productsRouter.get('/', async (request, response) => {
  const productsRepository = getRepository(ProductRepository);

  const products = await productsRepository.find();

  return response.json(products);
});

productsRouter.post('/', ensureAdminAutheticated, async (request, response) => {
  try {
    const { title, description, quantity, category } = request.body;

    const createProduct = new CreateProductService();

    const product = await createProduct.execute({
      title,

      description,

      quantity,

      category,
    });

    return response.json(product);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default productsRouter;
