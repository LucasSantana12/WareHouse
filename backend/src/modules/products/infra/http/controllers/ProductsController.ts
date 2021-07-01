import CategoriesRepository from '@modules/categories/infra/typeorm/repositories/CategoryRepository';
import CreateProductService from '@modules/products/services/CreateProductService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { getRepository } from 'typeorm';
import UpdateProductService from '@modules/products/services/UpdateProductService';
import Product from '../../typeorm/entities/Product';
import ProductsRepository from '../../typeorm/repositories/ProductsRepositories';

export default class ProductsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const productsRepository = getRepository(Product);
    const products = await productsRepository.find();
    return response.json(products);
  }

  public async create(request: Request, response: Response): Promise<Response> {
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
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      title,
      description,
      quantity,
      category,
      products_id,
    } = request.body;
    const updateProducts = container.resolve(UpdateProductService);

    const products = await updateProducts.execute({
      products_id,
      title,
      description,
      quantity,
      category,
    });

    return response.json(products);
  }
}
