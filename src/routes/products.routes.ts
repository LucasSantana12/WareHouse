import { Router } from 'express';
import { parseISO } from 'date-fns';

import { getCustomRepository } from 'typeorm';
import ProductRepository from '../repositories/ProductsRepository';
import CreateProductService from '../services/CreateProductService';

const productsRouter = Router();

productsRouter.get('/', async (request, response) => {
  const productsRepository = getCustomRepository(ProductRepository);
  const products = await productsRepository.find();

  return response.json(products);
});

productsRouter.post('/', async (request, response) => {
  try {
    const { title, description, quantity, category } = request.body;

    const createProduct = new CreateProductService();

    const product = await createProduct.execute({
      title,
      description,
      quantity,
      category
    });

    return response.json(product);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default productsRouter;
