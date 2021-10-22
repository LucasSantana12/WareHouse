import AppError from '@shared/error/AppError';

import { inject, injectable } from 'tsyringe';

import Product from '../infra/typeorm/entities/Product';

import IProductRepository from '../repositories/IProductsRepositories';

interface IRequest {
  products_id: string;

  title?: string;

  description: string;

  quantity: number;

  category: string;
}

@injectable()
class UpdateProduct {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductRepository,
  ) {}

  public async execute({
    products_id,

    title,

    description,

    quantity,

    category,
  }: IRequest): Promise<Product> {
    const product = await this.productsRepository.findById(products_id);

    if (!product) {
      throw new AppError('Product was not found');
    }

    const productWithUpdateTitle = await this.productsRepository.findByTitle(
      title!,
    );

    if (productWithUpdateTitle && productWithUpdateTitle.id !== title) {
      throw new AppError('this title already exists.');
    }

    product.title = title!;

    product.description = description;

    product.category = category;

    product.quantity = quantity;

    return this.productsRepository.save(product);
  }
}

export default UpdateProduct;
