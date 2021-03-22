import { Router } from 'express';
import { parseISO } from 'date-fns';

import ProductRepository from '../repositories/ProductsRepository';
import CreateProductService from '../services/CreateProductService';

const productsRouter = Router();
const productsRepository = new ProductRepository();

productsRouter.get('/', (request, response) => {
  const products = productsRepository.all();

  return response.json(products);
});

productsRouter.post('/', (request, response) => {
  try {
    const { title,description,quantity } = request.body;


    const createProduct = new CreateProductService(
      productsRepository,
    );

    const appointment = createProduct.execute({
      title,
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
