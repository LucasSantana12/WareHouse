import { getCustomRepository } from 'typeorm';

import Product from '../models/Product';
import ProductRepository from '../repositories/ProductsRepository';

interface Request {
  title: string;
  description: string;
  quantity: number;
}

class CreateProductService {
  public async execute({
    title,
    description,
    quantity,
  }: Request): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = productsRepository.create({
      title,
      description,
      quantity,
    });

    await productsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
