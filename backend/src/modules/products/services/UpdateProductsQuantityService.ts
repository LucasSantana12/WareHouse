import { getRepository } from 'typeorm';
import Product from '@modules/products/infra/typeorm/entities/Product';
import AppError from '../../../shared/error/AppError';

interface IRequest {
  product_id: string;
  quantity: number;
}
class UpdateProductsQuantityService {
  public async execute({ product_id, quantity }: IRequest): Promise<Product> {
    const productsRepository = getRepository(Product);

    const getProduct = await productsRepository.findOne(product_id);

    if (!getProduct) {
      throw new AppError('Não foi possivel encontrar o produto', 403);
    }

    getProduct.quantity = quantity;

    const product = await productsRepository.save(getProduct);

    return product;
  }
}

export default UpdateProductsQuantityService;
