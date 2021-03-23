import { getCustomRepository, getRepository } from 'typeorm';

import Product from '../models/Product';
import ProductRepository from '../repositories/ProductsRepository';
import Category from '../models/Category';

interface Request {
  title: string;
  description: string;
  quantity: number;
  category: string
}

class CreateProductService {
  public async execute({
    title,
    description,
    quantity,
    category
  }: Request): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);
    const PR = getRepository(ProductRepository);
    const categoryRepository = getRepository(Category);

    let productCategory = await categoryRepository.findOne({
      where:{
        title: category,
      }
    });
    if(!productCategory){
      productCategory = categoryRepository.create({
        title: category,
      });

      await categoryRepository.save(productCategory)
    }

    const product = productsRepository.create({
      title,
      description,
      quantity,
      category: productCategory
    });

    await productsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
