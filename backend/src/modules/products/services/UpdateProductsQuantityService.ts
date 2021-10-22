import Product from '@modules/products/infra/typeorm/entities/Product';

import AppError from '../../../shared/error/AppError';

import ProductsRepository from '../infra/typeorm/repositories/ProductsRepositories';

interface IRequest {
  product_id: string;

  quantity: number;
}

class UpdateProductsQuantityService {
  constructor(private productsRepository: ProductsRepository) {}

  public async execute({ product_id, quantity }: IRequest): Promise<Product> {
    const getProduct = await this.productsRepository.findById(product_id);

    if (!getProduct) {
      throw new AppError('Não foi possivel encontrar o produto', 403);
    }

    getProduct.quantity += quantity;

    const product = await this.productsRepository.save(getProduct);

    return product;
  }
}

export default UpdateProductsQuantityService;
